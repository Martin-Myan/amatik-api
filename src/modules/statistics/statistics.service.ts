import { Repository } from 'typeorm';
import { I18nContext } from 'nestjs-i18n';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ChainStatsOutputDto } from '@dto/statistics/chain-stats.output.dto';
import { RankingDataPaginationDto } from '@dto/shared/pagination.dto';
import { Coin } from '@entities/statistics/coin.entity';
import {
  mapFundingToPopularFundingOutputDto,
  mapToCollectCoinToBlockchainData,
  serializeAllocationOutPutDto,
  serializeChartDataOutPutDto,
} from './statistics.serializers';
import { COINID_BLOCKCHAINID } from '@constants/coingecko.constants';
import { paginate, paginateOptionsQB } from '../../database/postgres/paginate';
import { InvestorsOutputDto } from '@dto/statistics/investors.output.dto';
import { AllocationDataDto } from '@common/dtos/statistics/allocation.output.dto';
import { Allocation } from '@entities/statistics/allocation.entity';
import {
  CoinsSearchField,
  RankingSortField,
  SortOrder,
} from '@enums/sort-order.enum';
import { FundingOutputDto } from '@dto/statistics/funding.output.dto';
import { ChartDataDto } from '@common/dtos/statistics/chart.output.dto';
import { InvestorsStatistics } from '@interfaces/statistics';
import { Investor } from '@entities/statistics/investor.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Coin)
    private coinRepository: Repository<Coin>,
    @InjectRepository(Allocation)
    private allocationRepository: Repository<Allocation>,
    @InjectRepository(Investor)
    private investorRepository: Repository<Investor>,
  ) {}

  public async getRankingData(
    query: RankingDataPaginationDto,
  ): Promise<ChainStatsOutputDto> {
    // eslint-disable-next-line prefer-const
    let { sortField, sortOrder, perPage, page } = query;
    const chainKeys = Object.keys(COINID_BLOCKCHAINID);
    const sortFieldMapper = {
      [RankingSortField.UAW]: 'blockchain.uaw',
      [RankingSortField.DAPPS]: 'blockchain.dapps',
    };
    sortField = sortField ?? RankingSortField.MARKET_CAP;
    sortOrder = sortOrder ?? SortOrder.DESC;

    const fields = [CoinsSearchField.NAME, CoinsSearchField.SYMBOL];
    const searchArray = query.search
      ? fields.map((field) => `${field} ${query.search}`)
      : undefined;

    let qb = this.coinRepository.createQueryBuilder('coin');
    qb = qb.leftJoinAndSelect('coin.blockchain', 'blockchain');
    qb = paginateOptionsQB<Coin>(qb, {
      page,
      perPage,
      sortField: sortFieldMapper[sortField] ?? sortField,
      sortOrder,
      search: searchArray,
    });

    qb = qb.andWhere('coin.coinId IN (:...chainKeys)', { chainKeys });
    const result = await qb.getManyAndCount();
    return {
      rankingData: mapToCollectCoinToBlockchainData(result[0]),
      count: result[1],
    };
  }

  async getInvestorsByCoinId(
    coinId: string,
    page = 1,
    pageSize = 10,
  ): Promise<{ investors: InvestorsOutputDto[]; count: number }> {
    const pagination = paginate<Investor>({
      page,
      perPage: pageSize,
      sortField: 'id',
      sortOrder: SortOrder.DESC,
    });

    const result = await this.investorRepository.findAndCount({
      ...pagination,
      where: { ...pagination.where, coin: { coinId: coinId } },
      order: { rating: 'DESC' },
    });

    return {
      investors: result[0],
      count: result[1],
    };
  }

  public async getAllocationByCoinID(
    coinId: string,
  ): Promise<AllocationDataDto> {
    const i18n = I18nContext.current();
    const coin = await this.coinRepository.findOne({ where: { coinId } });
    if (!coin) {
      throw new NotFoundException(i18n.t('exception.CoinNotExist'));
    }
    const allocation = await this.allocationRepository.findOne({
      where: { coinId: coin.id },
      relations: {
        vesting: true,
      },
    });

    if (!allocation) {
      throw new NotFoundException(i18n.t('exception.CoinNotExist'));
    }

    return serializeAllocationOutPutDto(allocation);
  }

  public async getChartDataByCoinId(coinId: string): Promise<ChartDataDto> {
    const coin = await this.coinRepository.findOne({
      select: ['id', 'chart', 'chart_date'],
      where: { coinId },
      relations: ['chart_date', 'chart'],
    });
    if (!coin.chart_date) {
      const i18n = I18nContext.current();

      throw new NotFoundException(i18n.t('exception.CoinNotExist'));
    }
    return serializeChartDataOutPutDto(coin.toJSON());
  }

  public async getFundingByCoinId(coinId: string): Promise<FundingOutputDto[]> {
    const coin = await this.coinRepository
      .createQueryBuilder('coin')
      .leftJoinAndSelect('coin.fundings', 'funding')
      .leftJoinAndSelect('funding.investors', 'investors')
      .leftJoinAndSelect('funding.details', 'details')
      .where('coin.coinId = :coinId', { coinId })
      .orderBy('funding.start_date', 'DESC')
      .getOne();

    if (!coin) {
      const i18n = I18nContext.current();

      throw new NotFoundException(i18n.t('exception.CoinNotExist'));
    }

    return mapFundingToPopularFundingOutputDto(coin.fundings);
  }

  async getInvestorsStatistics(coinId: string) {
    const coin = await this.coinRepository.findOne({
      where: { coinId },
      relations: {
        fundings: true,
      },
    });

    if (!coin) {
      const i18n = I18nContext.current();

      throw new NotFoundException(i18n.t('exception.CoinNotExist'));
    }
    const investorsStatistics: InvestorsStatistics = {
      tokens_sold: 0,
      funds_raised: 0,
      total_supply_percent: 0,
    };
    coin.fundings.forEach((funding) => {
      investorsStatistics.tokens_sold += +funding.tokens_for_sale;
      investorsStatistics.funds_raised += +funding.funds_raised;
      investorsStatistics.total_supply_percent += +funding.total_supply_percent;
    });
    return investorsStatistics;
  }

  async getAdditionalStatistics(coinId: string): Promise<any> {
    const investorsStatistics = await this.getInvestorsStatistics(coinId);
    const launchDate = await this.coinRepository.findOne({
      where: { coinId },
      select: { launchDate: true },
    });
    const other_coins = await this.coinRepository.find({
      order: {
        price_change_percentage_1h: 'desc',
      },
      take: 3,
    });

    return {
      investors: {
        tokens_sold: investorsStatistics.tokens_sold,
        funds_raised: investorsStatistics.funds_raised,
        total_supply_percent: investorsStatistics.total_supply_percent,
      },
      launchDate,
      other_coins,
    };
  }
}
