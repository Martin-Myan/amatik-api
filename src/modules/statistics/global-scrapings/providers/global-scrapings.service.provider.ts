import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { I_GlobalScrapingsProviderConfig } from '@config/third-party/global-scrapings-provider.config';
import { DevelopersReportInterface } from '@modules/statistics/global-scrapings/interfaces/developers-report.interface';
import { DropsTabInterface } from '@modules/statistics/global-scrapings/interfaces/drops-tab.interface';
import { IResponse } from '../interfaces/vesting.interface';
import { IDappRadarData } from '../interfaces/dappradar.interface';

@Injectable()
export class GlobalScrapingsServiceProvider {
  private readonly globalScrapingsProviderConfig: I_GlobalScrapingsProviderConfig;

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.globalScrapingsProviderConfig = this.configService.get(
      'global-scrapings-provider',
    );
  }

  public async getDropsTabByCoinId(coinId: string): Promise<DropsTabInterface> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.globalScrapingsProviderConfig.global_scrapings_url}/dropstab`,
          {
            params: {
              coin: coinId,
            },
          },
        ),
      );

      this.logger.log(
        `Successfully getting DropsTab Data from Global Scrapings for ${coinId}`,
      );

      return response.data;
    } catch (err) {
      this.logger.warn('Error getting DropsTab from Global Scrapings', err);
      return null;
    }
  }

  public async getDevelopersReport(): Promise<DevelopersReportInterface[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.globalScrapingsProviderConfig.global_scrapings_url}/dev-report`,
        ),
      );

      this.logger.log(
        'Successfully get Developers Report from Global Scraping Provider',
      );

      return response.data;
    } catch (err) {
      this.logger.warn('Error getting Developers Report from Global Scrapings');
      throw new BadRequestException(err);
    }
  }

  public async getTokenAllocationByTokenId(
    tokenid: string,
  ): Promise<IResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.globalScrapingsProviderConfig.global_scrapings_url}/allocation`,
          {
            params: {
              token: tokenid,
            },
          },
        ),
      );
      this.logger.log(
        'Successfully Get Token Unlocks data from Global Scrapings Provider',
      );
      return response.data;
    } catch (err) {
      this.logger.warn(
        'Error getting Token Unlocks data from Global Scrapings',
      );
    }
  }

  public async getTokenChartByTokenId(tokenid: string): Promise<IResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.globalScrapingsProviderConfig.global_scrapings_url}/chart`,
          {
            params: {
              token: tokenid,
            },
          },
        ),
      );
      this.logger.log(
        'Successfully Get Token Unlocks data from Global Scrapings Provider',
      );
      return response.data;
    } catch (err) {
      this.logger.warn(
        'Error getting Token Unlocks data from Global Scrapings',
      );
    }
  }

  public async getBlochchainUaw(): Promise<IDappRadarData[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.globalScrapingsProviderConfig.global_scrapings_url}/dappradar`,
        ),
      );

      this.logger.log('Succefullt get dappradar ranking data');
      return response.data;
    } catch (error) {
      this.logger.error('Error getting Dappradar dapps and uaw');
    }
  }
}
