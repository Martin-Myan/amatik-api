import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, retry, throwError, timer } from 'rxjs';
import { COINGECKO_ENDPOINTS } from '@constants/coingecko.constants';
import { MarketsResponse } from '@modules/statistics/coingecko/interfaces/coin.interface';
import { CoinDetail } from '@modules/statistics/coingecko/interfaces/coin-detail.interface';
import { MarketStats } from '@modules/statistics/coingecko/interfaces/global-market.interface';

@Injectable()
export class CoingeckoServiceProvider {
  private readonly logger: Logger;

  constructor(private httpService: HttpService) {
    this.logger = new Logger(CoingeckoServiceProvider.name);
  }

  async ping(): Promise<any> {
    const response = await firstValueFrom(
      this.httpService.get(COINGECKO_ENDPOINTS.PING),
    );
    return response.data;
  }

  public async getCoinsMarket(): Promise<MarketsResponse[]> {
    try {
      const results: MarketsResponse[] = [];

      for (let page = 1; page <= 2; page++) {
        const response = await firstValueFrom(
          this.httpService.get(COINGECKO_ENDPOINTS.COINS_MARKET(page)).pipe(
            retry({
              delay: (error) => {
                if (error.response?.status === 429) {
                  return timer(45 * 1000);
                }
                return throwError(error);
              },
            }),
          ),
        );

        results.push(...response.data);
      }

      this.logger.log('Successfully Getting All Coins Data');

      return results;
    } catch (err) {
      this.logger.error('Failed Getting Coins Data', err);
      throw new BadRequestException(err);
    }
  }

  public async getCoinStatistics(coinId: string): Promise<CoinDetail> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(COINGECKO_ENDPOINTS.COIN_DETAILS(coinId)).pipe(
          retry({
            count: 1,
            delay: (error) => {
              if (error.response?.status === 429) {
                return timer(90 * 1000);
              }
              return throwError(error);
            },
          }),
        ),
      );

      this.logger.log(
        `Successfully Getting All Coins Statistics Data ${coinId}`,
      );

      return response.data;
    } catch (err) {
      this.logger.error('Failed Getting All Coins Statistics', err);
      return null;
    }
  }

  public async getGlobalMarketData(): Promise<MarketStats> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(COINGECKO_ENDPOINTS.GLOBAL_MARKET),
      );

      this.logger.log('Successfully Getting Global Market Data Statistics');

      return response.data.data as MarketStats;
    } catch (err) {
      this.logger.error('Failed Getting Global Market Data Statistics', err);
      throw new BadRequestException(err);
    }
  }
}
