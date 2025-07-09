export interface IDappRadarData {
  chainId: number;
  new: boolean;
  dappCount: number;
  dappCountAbsoluteChange: number;
  smartContractCount: number;
  uawCount: number;
  uawCountChange: number;
  transactionCount: number;
  transactionCountChange: number;
  totalVolumeInFiat: number;
  totalVolumeChange: number;
  tvlInFiat: number;
  tvlChange: number;
  totalNftVolumeInFiat: number;
  totalNftVolumeChange: number;
  token: {
    aggregatedTokenId: number;
    logo: string;
    slug: string;
    lowLiquidity: boolean;
    symbol: string;
    priceInFiat: number;
    priceChange: number;
  };
}
