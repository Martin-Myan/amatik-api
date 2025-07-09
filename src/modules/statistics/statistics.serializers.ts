import { Coin } from '@entities/statistics/coin.entity';
import { Investor } from '@entities/statistics/investor.entity';
import { ChainStatsPreOutputDto } from '@dto/statistics/chain-stats.output.dto';
import { InvestorsOutputDto } from '@common/dtos/statistics/investors.output.dto';
import { Allocation } from '@entities/statistics/allocation.entity';
import { Funding } from '@entities/statistics/funding_rounds.entity';
import { FundingOutputDto } from '@dto/statistics/funding.output.dto';
import { AllocationDataDto } from '@common/dtos/statistics/allocation.output.dto';
import { ChartDataDto } from '@common/dtos/statistics/chart.output.dto';

export const mapToCollectCoinToBlockchainData = (coins: Coin[]) => {
  return coins.map((coin) => ({
    coinId: coin.coinId,
    chainName: coin.name,
    current_price: coin.current_price,
    market_cap: coin.market_cap,
    dapps: coin.blockchain?.dapps | 0,
    developers: coin.developers | 0,
    uaw: coin.blockchain?.uaw || null,
    image: coin.image,
  })) as ChainStatsPreOutputDto[];
};

export const mapInvestorsToPopularInvestorsOutputDto = (
  investorData: Investor[],
) => {
  return investorData.map((investor) => ({
    id: investor.id,
    name: investor.name,
    avatar: investor.avatar,
    stage: investor.stage,
    tier: investor.tier,
    rating: investor.rating,
    type: investor.type,
  })) as InvestorsOutputDto[];
};

export const serializeAllocationOutPutDto = (allocationData: Allocation) => {
  const AllocationOutput = {
    id: allocationData.id,
    totalRaise: allocationData.totalRaise,
    vesting: [],
    totalCirculation: allocationData.totalCirculation,
    ticker: allocationData.ticker,
  };

  for (const vesting of allocationData.vesting) {
    const data = {
      stage: vesting.stageName,
      order: vesting.order,
      color: vesting.color,
      price: vesting.price,
      priceDisplay: vesting.priceDisplay,
      tokens: vesting.tokens,
      tokenPercent: vesting.tokenPercent,
      roundRaise: vesting.roundRaise,
      roundRaiseDisplay: vesting.roundRaiseDisplay,
      valuation: vesting.roundRaiseDisplay,
      valuationDisplay: vesting.valuationDisplay,
      vesting: vesting.vesting,
      vestingDisplay: vesting.vestingDisplay,
    };
    AllocationOutput.vesting.push(data);
  }

  return AllocationOutput as AllocationDataDto;
};

export const mapFundingToPopularFundingOutputDto = (fundingData: Funding[]) => {
  return fundingData.map((funding) => ({
    id: funding.id,
    name: funding.name,
    funds_raised: funding.funds_raised,
    tokens_for_sale: funding.tokens_for_sale,
    total_supply_percent: funding.total_supply_percent,
    platformPicture: funding.platformPicture,
    platformName: funding.platformName,
    pre_value: funding.pre_value,
    roi_bnb: funding.roi_bnb,
    roi_btc: funding.roi_btc,
    price: funding.price,
    start_date: funding.start_date,
    roi_eth: funding.roi_eth,
    roi_usd: funding.roi_usd,
    tokenDistributions: funding.distribution_type,
    investors: funding.investors.map((investor) => ({
      id: investor.id,
      avatar: investor.avatar,
      name: investor.name,
    })),
    details: funding.details.map((detail) => ({
      id: detail.id,
      title: detail.title,
      url: detail.url,
    })),
  })) as FundingOutputDto[];
};

export const serializeChartDataOutPutDto = (chartData) => {
  const data = {
    labels: chartData.chart_date.date,
    datasets: [],
  };

  data.datasets = chartData.chart.map((elem) => ({
    label: elem.label,
    bg_color: elem.bg_color,
    dataset: elem.data,
  }));

  return data as ChartDataDto;
};
