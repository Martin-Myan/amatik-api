export interface DateType {
  growth: boolean;
  percent: string;
  baseCurrency: string;
}

export interface Statistic {
  hourStat: DateType;
  dailyStat: DateType;
  weeklyStat: DateType;
}

export interface AllDataResponse {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  volumePrice: string;
  tokenCount: number;
  marketCapPrice: string;
  statistic: Statistic;
}
