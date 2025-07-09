export interface MarketStats {
  active_cryptocurrencies: number;
  total_market_cap: {
    usd: number;
  };
  market_cap_percentage: object;
  total_volume: {
    usd: number;
  };
  market_cap_change_percentage_24h_usd: object;
}
