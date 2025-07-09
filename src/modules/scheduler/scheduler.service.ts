import { Injectable, Logger } from '@nestjs/common';
import { MainService } from '@modules/main/main.service';
import { CoingeckoService } from '@modules/statistics/coingecko/coingecko.service';
import { RapidService } from '@modules/statistics/rapid/rapid.service';
import { GlobalScrapingsService } from '@modules/statistics/global-scrapings/global-scrapings.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { cronConfig } from '@common/config/cronJobs/cronjob.config';

@Injectable()
export class SchedulerService {
  private readonly logger: Logger;

  constructor(
    private readonly mainService: MainService,
    private readonly rapidService: RapidService,
    private readonly coingeckoService: CoingeckoService,
    private readonly globalScrapingsService: GlobalScrapingsService,
  ) {
    this.logger = new Logger(SchedulerService.name);
  }

  @Cron(CronExpression.EVERY_10_MINUTES, {
    disabled: cronConfig.all,
  })
  async getAmatikBSCanHolders() {
    this.logger.log('Amatik Holders Cron Started');
    await this.mainService.getAmatikBSCanHolders();
    this.logger.log('Amatik Holders Cron Ended');
  }

  @Cron(CronExpression.EVERY_5_SECONDS, {
    disabled: cronConfig.all,
  })
  async amatikToBnbPriceEventListener() {
    this.logger.log('Web3 Socket Cron Started');
    await this.mainService.getAmatikToBnbPrice();
    this.logger.log('Web3 Socket Cron Ended');
  }

  async updateCoinStatsEventListener() {
    this.logger.log('Update Coin Stats Cron Started');
    await this.coingeckoService.updatePricesHourly();
    this.logger.log('Update Coin Stats Cron Ended');
  }

  @Cron(CronExpression.EVERY_MINUTE, { disabled: cronConfig.all })
  async updateCoinPricesEventListener() {
    this.logger.log('Update Coin Prices Cron Started');
    await this.coingeckoService.syncCoins();
    this.logger.log('Update Coin Prices Cron Ended');
  }

  @Cron(CronExpression.EVERY_12_HOURS, { disabled: cronConfig.all })
  async updateIndexesEventListener() {
    this.logger.log('Update Indexes Cron Started');
    await this.rapidService.updateIndexes();
    this.logger.log('Update IndexesCron Ended');
  }

  @Cron(CronExpression.EVERY_HOUR, { disabled: cronConfig.all })
  async updateGlobalMarketEventListener() {
    this.logger.log('Update Global Market Cron Started');
    await this.coingeckoService.updateGlobalMarketData();
    this.logger.log('Update Global Market Cron Ended');
  }

  @Cron(CronExpression.EVERY_WEEK, { disabled: cronConfig.all })
  async updateGlobalScrapingsDevelopersReport() {
    this.logger.log('Update Global Scrapings Dev Report Cron Started');
    await this.globalScrapingsService.setDevelopersReport();
    this.logger.log('Update Global Scrapings Dev Report Cron Ended');
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM, { disabled: cronConfig.all })
  async updateGlobalScrapingsDropsTab() {
    this.logger.log('Update Global Scrapings DropsTab Cron Started');
    await this.globalScrapingsService.setDropsTab();
    this.logger.log('Update Global Scrapings  DropsTab Cron Ended');
  }

  @Cron(CronExpression.EVERY_WEEK, { disabled: cronConfig.all })
  async updateGlobalScrapingsAllocation() {
    this.logger.log(
      'Update Global Scrapings Allocation and Chart Cron Started',
    );
    await this.globalScrapingsService.setAllocationInfo();
    await this.globalScrapingsService.setChartData();
    this.logger.log('Update Global Scrapings Allocation and Chart Cron Ended');
  }

  @Cron(CronExpression.EVERY_WEEK, { disabled: cronConfig.all })
  async updateGlobalScrapingsDappRadar() {
    this.logger.log('Update Global Scrapings DappRadar Cron Started');
    await this.globalScrapingsService.setUAW();
    this.logger.log('Update Global Scrapings DappRadar Cron Ended');
  }
}
