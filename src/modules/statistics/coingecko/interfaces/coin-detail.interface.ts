interface PricePercentage {
  usd: number;
  eur: number;
}

interface MarketData {
  price_change_percentage_1h_in_currency: PricePercentage;
  price_change_percentage_24h_in_currency: PricePercentage;
  price_change_percentage_7d_in_currency: PricePercentage;
}

interface DeveloperData {
  pull_request_contributors: number;
}

interface LinkData {
  homepage: string[];
  chat_url: string[];
  facebook_username: string;
  twitter_screen_name: string;
  telegram_channel_identifier: string;
  subreddit_url: string;
  repos_url: {
    github: string[];
    bitbucket: string[];
  };
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  market_data: MarketData;
  developer_data: DeveloperData;
  links: LinkData;
}
