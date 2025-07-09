type DropsTabInvestorType = {
  id: number;
  name: string;
  slug: string;
  image: string;
  country: {
    name: string;
    flag: string;
  };
  rating: number;
  type: string;
  links: { link: string; type: string }[];
  saleIds: number[];
  tier: string;
  lead: boolean;
  description: string;
};

type DropsTabFundraisingType = {
  id: number;
  name: string;
  startDate: number;
  endDate: number;
  inaccurateDate: boolean;
  price?: number;
  raised: number;
  preValuation: number;
  tokensForSaleAmount?: number;
  tokensForSalePercent: number;
  tokensForSalePercentDouble: number;
  minPersonalCap: number;
  maxPersonalCap: number;
  platform?: {
    logo: string;
    name: string;
  };
  totalTokens: number;
  fundraisingGoal: number;
  roi: {
    USD?: number;
    BTC?: number;
    ETH?: number;
    BNB?: number;
  };
  roiFromLastRound?: number;
  lastRoundName?: string;
  unlockType?: string;
  unlockImage?: string;
  howToParticipate?: string;
  moreDetailsLinks: {
    title: string;
    url: string;
  }[];
  unlockProgress?: number;
  published: string;
  includeInPieChart: string;
  claimLink?: string;
  investors: DropsTabInvestorType[];
};

export interface DropsTabInterface {
  coinName: string;
  price: number;
  fundraising: DropsTabFundraisingType[];
  investors: DropsTabInvestorType[];
  launchDate?: string;
}
