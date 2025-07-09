import { Coin } from './coin.entity';
import { Investor } from './investor.entity';
import { Blockchain } from './blockchain.entity';
import { Allocation } from './allocation.entity';
import { VestingDetails } from './vestingDetails.entity';
import { Funding } from '@entities/statistics/funding_rounds.entity';
import { FundingDetails } from '@entities/statistics/funding_details.entity';
import { ChartDataset } from './chart_dataset.entity';
import { ChartDate } from './chart_date.entity';

export const statisticsEntitiesPostgres = [
  Coin,
  Investor,
  Blockchain,
  Allocation,
  VestingDetails,
  Funding,
  FundingDetails,
  ChartDataset,
  ChartDate,
];
