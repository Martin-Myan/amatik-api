export const COINGECKO_API_BASE_URL = 'https://api.coingecko.com/api/v3';
export const API_KEY = 'CG-wysvNXJM9sZ6bNx16akyxXqG\t';
export const COINGECKO_ENDPOINTS = {
  PING: `${COINGECKO_API_BASE_URL}/ping`,
  COINS_LIST: `${COINGECKO_API_BASE_URL}/coins/list`,
  COIN_DETAILS: (coinId: string) => `${COINGECKO_API_BASE_URL}/coins/${coinId}`,
  COINS_MARKET: (page: number) =>
    `${COINGECKO_API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&api_key=${API_KEY}`,
  GLOBAL_MARKET: `${COINGECKO_API_BASE_URL}/global`,
};

export const COINID_BLOCKCHAINID = {
  binancecoin: 'binance-smart-chain',
  ethereum: 'ethereum',
  fantom: 'fantom',
  ripple: 'ripple',
  cardano: 'cardano',
  solana: 'solana',
  'tron-bsc': 'tron',
  'matic-network': 'polygon',
  'avalanche-2': 'avalanche',
  stellar: 'stellar',
  vechain: 'vechain',
  monero: 'monero',
  filecoin: 'filecoin',
  optimism: 'optimism',
  near: 'near',
  arbitrum: 'arbitrum',
  algorand: 'algorand',
  eos: 'eos',
  tezos: 'tezos',
  'immutable-x': 'immutablex',
  'injective-protocol': 'injective-protocol',
  flow: 'flow',
  'klay-token': ' klaytn',
  astar: 'astar',
};
