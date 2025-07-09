interface IStage {
  stage: string;
  order: number;
  color: string;
}

interface IVesting {
  stage: IStage;
  price: number;
  priceDisplay: string;
  tokens: number;
  tokenPercent: number;
  roundRaise: string;
  roundRaiseDisplay: string;
  valuation: string;
  valuationDisplay: string;
  vesting: string;
  vestingDisplay: string;
}

interface IAllocation {
  totalRaise: string;
  vesting: IVesting[];
  totalCirculation: string;
  ticker: string;
}

interface IChartDataset {
  label: string;
  bg_color: string;
  data: number[];
}

interface IChart {
  labels: string[];
  datasets: IChartDataset[];
}

export interface IResponse {
  allocations: IAllocation;
  chart: IChart;
}
