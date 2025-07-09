import { GlobalCryptoDataType } from '@enums/global-crypto-market.enum';

interface ValueText {
  value: number;
  valueText: string;
}

export interface IndexDto {
  now: ValueText;
  previousClose: ValueText;
  oneWeekAgo: ValueText;
  oneMonthAgo: ValueText;
  oneYearAgo: ValueText;
  dataType: GlobalCryptoDataType;
}

export interface IndexResponse {
  fgi: IndexDto;
}
