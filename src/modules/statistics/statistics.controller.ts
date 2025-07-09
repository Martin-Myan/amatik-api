import { Controller, Get, Param, Put, Query } from '@nestjs/common';
import { CoingeckoService } from '@modules/statistics/coingecko/coingecko.service';
import { RapidService } from '@modules/statistics/rapid/rapid.service';
import { StatsService } from '@modules/statistics/statistics.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ResSuccessDto } from '@responses/resSuccess.dto';
import {
  PopularCoinsDataOutputDto,
  PopularCoinsResOutputDto,
} from '@dto/statistics/popular-crypto.output.dto';
import {
  FgiDataOutputDto,
  FgiDataResOutputDto,
} from '@dto/statistics/fgi.output.dto';
import {
  MarketStatsDataOutputDto,
  MarketStatsResOutputDto,
} from '@dto/statistics/market-stats.output.dto';
import {
  AllCoinsPaginationDto,
  RankingDataPaginationDto,
} from '@dto/shared/pagination.dto';
import {
  ChainStatsOutputDto,
  ChainStatsResOutputDto,
} from '@dto/statistics/chain-stats.output.dto';
import {
  InvestorDataOutputDto,
  InvestorsOutputDto,
  InvestorsResOutputDto,
} from '@dto/statistics/investors.output.dto';
import {
  CoinDataOutputDto,
  CoinDataResOutputDto,
} from '@dto/statistics/coins.output.dto';
import { GlobalScrapingsService } from '@modules/statistics/global-scrapings/global-scrapings.service';
import {
  OtherStatistics,
  SingleCoinDataOutputDto,
  SingleCoinResOutputDto,
} from '@dto/statistics/single-coin.output.dto';
import {
  AllocationDataDto,
  AllocationDataResDto,
} from '@common/dtos/statistics/allocation.output.dto';
import {
  FundingDataOutputDto,
  FundingResOutputDto,
} from '@dto/statistics/funding.output.dto';
import {
  ChartDataDto,
  ChartDataResDto,
} from '@common/dtos/statistics/chart.output.dto';

@Controller('stats')
@ApiTags('statistics')
export class StatisticsController {
  constructor(
    private readonly coingeckoService: CoingeckoService,
    private readonly rapidService: RapidService,
    private readonly statsService: StatsService,
    private readonly globalScrapingsService: GlobalScrapingsService,
  ) {}

  @Put('update-coin-stats')
  @ApiOperation({ summary: 'Update Coins Statistics Object' })
  async updateCoinStats() {
    return await this.coingeckoService.updatePricesHourly();
  }

  @Put('update-coins')
  @ApiOperation({ summary: 'Update Coins prices' })
  async updateCoinPrices() {
    return await this.coingeckoService.syncCoins();
  }

  @ApiOperation({ summary: 'Update UAWs' })
  @Put('uaw-update')
  async updateUAWs() {
    return await this.globalScrapingsService.setUAW();
  }

  @Put('update-dropstab')
  @ApiOperation({ summary: 'Update DropsTab' })
  async updateInvestors() {
    return await this.globalScrapingsService.setDropsTab();
  }

  @ApiOperation({ summary: 'Update Dev Reports' })
  @Put('dev-report')
  async updateDevReport() {
    return await this.globalScrapingsService.setDevelopersReport();
  }

  @ApiOperation({ summary: 'Update TokenAllocation' })
  @Put('token-allocation')
  async updateTokenUnlock() {
    return await this.globalScrapingsService.setAllocationInfo();
  }

  @ApiOperation({ summary: 'Update Chart Data' })
  @Put('chart')
  async updateChartData() {
    return await this.globalScrapingsService.setChartData();
  }

  @ApiOperation({ summary: 'Update FGI Index' })
  @Put('fgi-indexes-update')
  async UpdateIndexes() {
    return await this.rapidService.updateIndexes();
  }

  @Put('market-stats')
  @ApiOperation({ summary: 'Update Global Market' })
  async updateGlobalMarket() {
    await this.coingeckoService.updateGlobalMarketData();
  }

  @Get('investors/:coinId')
  @ApiOperation({ summary: 'Get Investors By CoinId' })
  @ApiOkResponse({ type: InvestorsResOutputDto })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number',
    required: false,
  })
  @ApiQuery({
    name: 'pageSize',
    type: Number,
    description: 'Number of records per page',
    required: false,
  })
  async getInvestors(
    @Param('coinId') coinId: string,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    const investors = await this.statsService.getInvestorsByCoinId(
      coinId,
      page,
      pageSize,
    );
    return new ResSuccessDto<InvestorDataOutputDto>({
      data: {
        investors: investors.investors.map((i) => new InvestorsOutputDto(i)),
        count: investors.count,
      },
    });
  }

  @Get('funding/:coinId')
  @ApiOperation({ summary: 'Get Fundings By CoinId' })
  @ApiOkResponse({ type: FundingResOutputDto })
  async getFunding(@Param('coinId') coinId: string) {
    const funding = await this.statsService.getFundingByCoinId(coinId);
    return new ResSuccessDto<FundingDataOutputDto>({
      data: { funding },
    });
  }

  @Get('all-coins-data')
  @ApiOperation({ summary: 'Get all Coins data' })
  @ApiOkResponse({ type: CoinDataResOutputDto })
  async getAllData(
    @Query() query: AllCoinsPaginationDto,
  ): Promise<CoinDataResOutputDto> {
    const { coins, count } = await this.coingeckoService.getAllData(query);
    return new ResSuccessDto<CoinDataOutputDto>({
      data: { coins, count },
    });
  }

  @Get('popular-coins')
  @ApiOperation({ summary: 'Get Popular Coins' })
  @ApiOkResponse({ type: PopularCoinsResOutputDto })
  async getPopularCoins() {
    const popularCoins = await this.coingeckoService.getPopularCoins();
    return new ResSuccessDto<PopularCoinsDataOutputDto>({
      data: { popularCoins },
    });
  }

  @Get('single-coin/:coinId')
  @ApiOperation({ summary: 'Get Popular Single Coin' })
  @ApiOkResponse({ type: SingleCoinResOutputDto })
  async getSingleCoin(@Param('coinId') coinId: string) {
    const singleCoin = await this.coingeckoService.getPopularSingleCoin(coinId);
    const otherStatistics = await this.statsService.getAdditionalStatistics(
      coinId,
    );
    return new ResSuccessDto<SingleCoinDataOutputDto>({
      data: { coin: singleCoin, other: new OtherStatistics(otherStatistics) },
    });
  }

  @Get('indexes')
  @ApiOperation({ summary: 'Get FGI Index' })
  @ApiOkResponse({ type: FgiDataResOutputDto })
  async getAllIndexes() {
    const fgiIndexes = await this.rapidService.getIndexes();
    return new ResSuccessDto<FgiDataOutputDto>({
      data: { fgiIndexes },
    });
  }

  @Get('market-stats')
  @ApiOperation({ summary: 'Get Global Market Data' })
  @ApiOkResponse({ type: MarketStatsResOutputDto })
  async getGlobalMarket() {
    const globalMarketStats = await this.coingeckoService.getGlobalMarket();
    return new ResSuccessDto<MarketStatsDataOutputDto>({
      data: { globalMarketStats },
    });
  }

  @Get('ranking-data')
  @ApiOkResponse({ type: ChainStatsResOutputDto })
  @ApiOperation({ summary: 'Get Blockchain Ranking Data' })
  async getRankingData(@Query() query: RankingDataPaginationDto) {
    const { rankingData, count } = await this.statsService.getRankingData(
      query,
    );

    return new ResSuccessDto<ChainStatsOutputDto>({
      data: { rankingData, count },
    });
  }

  @Get('allocation/:coinId')
  @ApiOkResponse({ type: AllocationDataResDto })
  @ApiOperation({ summary: 'Get Coin Allocation Data' })
  async getAllocationData(@Param('coinId') coinId: string) {
    const allocation = await this.statsService.getAllocationByCoinID(coinId);

    return new ResSuccessDto<AllocationDataDto>({
      data: allocation,
    });
  }

  @Get('chart/:coinId')
  @ApiOkResponse({ type: ChartDataResDto })
  @ApiOperation({ summary: 'Get Coin Chart Data' })
  async getChartData(@Param('coinId') coinId: string) {
    const chart = await this.statsService.getChartDataByCoinId(coinId);
    return new ResSuccessDto<ChartDataDto>({
      data: chart,
    });
  }
}
