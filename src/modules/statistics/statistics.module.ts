import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatsService } from '@modules/statistics/statistics.service';
import { RapidService } from '@modules/statistics/rapid/rapid.service';
import { RapidServiceProvider } from '@modules/statistics/rapid/providers/rapid.service.provider';
import { CoingeckoService } from '@modules/statistics/coingecko/coingecko.service';
import { CoingeckoServiceProvider } from '@modules/statistics/coingecko/providers/coingecko.service.provider';
import { HttpModule } from '@nestjs/axios';
import { LoggerMiddleware } from '@middlewares/logger.middleware';
import { GlobalScrapingsService } from '@modules/statistics/global-scrapings/global-scrapings.service';
import { GlobalScrapingsServiceProvider } from '@modules/statistics/global-scrapings/providers/global-scrapings.service.provider';

@Module({
  controllers: [StatisticsController],
  imports: [HttpModule],
  providers: [
    StatsService,
    RapidService,
    RapidServiceProvider,
    CoingeckoService,
    CoingeckoServiceProvider,
    GlobalScrapingsService,
    GlobalScrapingsServiceProvider,
    Logger,
  ],
  exports: [
    RapidService,
    RapidServiceProvider,
    CoingeckoService,
    CoingeckoServiceProvider,
    GlobalScrapingsService,
    GlobalScrapingsServiceProvider,
  ],
})
export class StatisticsModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(StatisticsController);
  }
}
