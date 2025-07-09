import { Model } from 'mongoose';
import { I18nContext } from 'nestjs-i18n';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RapidServiceProvider } from './providers/rapid.service.provider';
import { GlobalCryptoData } from '@schemas/statistics/global-crypto-data.schema';
import { GlobalCryptoDataType } from '@enums/global-crypto-market.enum';
import { FgiOutputDto } from '@dto/statistics/fgi.output.dto';

@Injectable()
export class RapidService {
  constructor(
    @InjectModel(GlobalCryptoData.name)
    private globalCryptoDataModel: Model<GlobalCryptoData>,
    private readonly rapidServiceProvider: RapidServiceProvider,
  ) {}

  public async updateIndexes(): Promise<void> {
    try {
      const indexes = await this.rapidServiceProvider.getIndexes();
      const indexesToWrite = indexes.fgi;
      indexesToWrite.dataType = GlobalCryptoDataType.FGI;
      await this.globalCryptoDataModel.deleteMany({
        dataType: GlobalCryptoDataType.FGI,
      });
      await this.globalCryptoDataModel.create(indexesToWrite);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async getIndexes(): Promise<FgiOutputDto> {
    const result = await this.globalCryptoDataModel
      .findOne({
        dataType: GlobalCryptoDataType.FGI,
      })
      .exec();

    if (!result) {
      const i18n = I18nContext.current();

      throw new NotFoundException(i18n.t('exception.FgiNotExist'));
    }

    return {
      now: result.now,
      previousClose: result.previousClose,
      oneWeekAgo: result.oneWeekAgo,
      oneMonthAgo: result.oneMonthAgo,
      oneYearAgo: result.oneYearAgo,
    } as FgiOutputDto;
  }
}
