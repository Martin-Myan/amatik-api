import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { I_RapidProviderConfig } from '@config/third-party/rapid-provider.config';
import { IndexResponse } from './../interfaces/index.interface';

@Injectable()
export class RapidServiceProvider {
  private readonly rapidProviderConfig: I_RapidProviderConfig;
  private readonly logger: Logger;

  constructor(
    private httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.rapidProviderConfig = this.configService.get('rapid-provider');
    this.logger = new Logger(RapidServiceProvider.name);
  }

  public async getIndexes(): Promise<IndexResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.rapidProviderConfig.rapid_url}/fgi`, {
          headers: {
            'X-RapidAPI-Key': this.rapidProviderConfig.rapid_api_key,
          },
        }),
      );

      this.logger.log('Successfully get Fgi Indexes from Rapid Provider');

      return response.data;
    } catch (err) {
      this.logger.error('Failed to get fgi indexes', err);
      throw new BadRequestException(err);
    }
  }
}
