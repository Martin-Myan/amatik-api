import { ApiProperty } from '@nestjs/swagger';
import { Coin } from '@entities/statistics/coin.entity';
import { ResSuccessDto } from '@responses/resSuccess.dto';
import { scientificToDecimal } from '@utils/scientificToDecimal';
import { BlockchainDataDto } from '@dto/statistics/blockchain.output.dto';

class CoinStatisticsDto {
  @ApiProperty()
  readonly hourStat: number;

  @ApiProperty()
  readonly dailyStat: number;

  @ApiProperty()
  readonly weeklyStat: number;
}

class SocialMediaDto {
  constructor(coin: Coin) {
    this.facebook = coin.facebook_url;
    this.telegram = coin.telegram_url;
    this.twitter = coin.twitter_url;
    this.github = coin.repo_url;
    this.reddit = coin.subreddit_url;
    this.homepage = coin.homepage;
    this.chat = coin.chat_url;
  }

  @ApiProperty({
    example: 'https://www.facebook.com/BitcoinOfficialPage/',
    nullable: true,
  })
  readonly facebook: string;

  @ApiProperty({ example: 'https://t.me/Bitcoin', nullable: true })
  readonly telegram: string;

  @ApiProperty({ example: 'https://twitter.com/bitcoin', nullable: true })
  readonly twitter: string;

  @ApiProperty({
    example: 'https://github.com/bitcoin/bitcoin',
    nullable: true,
  })
  readonly github: string;

  @ApiProperty({ example: 'https://www.reddit.com/r/Bitcoin/', nullable: true })
  readonly reddit: string;

  @ApiProperty({ example: 'https://www.bitcoin.com/', nullable: true })
  readonly homepage: string;

  @ApiProperty({
    example: 'https://discord.com/invite/CetY6Y4',
    nullable: true,
  })
  readonly chat: string;
}

export class SingleCoinOutputDto {
  constructor(coin: Coin) {
    this.coinId = coin.coinId;
    this.name = coin.name;
    this.symbol = coin.symbol;
    this.image = coin.image;
    this.current_price = scientificToDecimal(coin.current_price.toString());
    this.market_cap = coin.market_cap;
    this.high_24h = coin.total_volume;
    this.max_supply = coin.max_supply;
    this.total_supply = coin.total_supply;
    this.circulating_supply = coin.circulating_supply;
    this.developers = coin.developers;
    this.description = coin.description;
    this.statistics = {
      hourStat: coin.price_change_percentage_1h,
      dailyStat: coin.price_change_percentage_24h,
      weeklyStat: coin.price_change_percentage_7d,
    };
    this.blockchain = new BlockchainDataDto(coin.blockchain);
    this.socials = new SocialMediaDto(coin);
    this.price_change_percentage_24h = coin.price_change_percentage_24h;
    this.market_cap_change_percentage_24h =
      coin.market_cap_change_percentage_24h;
    this.sparkline_in_7d = JSON.parse(coin.sparkline_in_7d);
  }

  @ApiProperty({ example: 'bitcoin' })
  readonly coinId: string;

  @ApiProperty({ example: 'Bitcoin' })
  readonly name: string;

  @ApiProperty({ example: 'BTC' })
  readonly symbol: string;

  @ApiProperty({
    example:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  })
  readonly image: string;

  @ApiProperty({ example: '26351' })
  readonly current_price: string;

  @ApiProperty({ example: 513451261192 })
  readonly market_cap: number;

  @ApiProperty({ example: 26744 })
  readonly high_24h: number;

  @ApiProperty({ example: 10207766871 })
  readonly total_supply: number;

  @ApiProperty({ example: 234234232323 })
  readonly max_supply: number;

  @ApiProperty({ example: 1024 })
  readonly circulating_supply: number;

  @ApiProperty({ example: 231233 })
  readonly developers: number;

  @ApiProperty({ example: 'Bitcoin is a decentralized digital currency' })
  readonly description: string;

  @ApiProperty({ type: SocialMediaDto })
  readonly socials: SocialMediaDto;

  @ApiProperty({ type: BlockchainDataDto })
  readonly blockchain: BlockchainDataDto;

  @ApiProperty({ type: CoinStatisticsDto })
  readonly statistics: CoinStatisticsDto;

  @ApiProperty({ example: 0.47386 })
  readonly price_change_percentage_24h: number;

  @ApiProperty({ example: 0.47386 })
  readonly market_cap_change_percentage_24h: number;

  @ApiProperty({
    example: [0.123, 0.123, 0.123],
    isArray: true,
    type: Number,
    nullable: true,
  })
  readonly sparkline_in_7d: number[];
}

export class InvestorsStatsDto {
  @ApiProperty({ example: 47386 })
  readonly tokens_sold: number;
  @ApiProperty({ example: 47386 })
  readonly funds_raised: number;
  @ApiProperty({ example: 47.386 })
  readonly total_supply_percent: number;
}

export class OtherCoinsDto {
  @ApiProperty({ example: 'bitcoin' })
  readonly coinId: string;

  @ApiProperty({ example: 'Bitcoin' })
  readonly name: string;

  @ApiProperty({ example: 'BTC' })
  readonly symbol: string;

  @ApiProperty({
    example:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  })
  readonly image: string;

  @ApiProperty({ example: '26351' })
  readonly current_price: string;
}

export class OtherStatistics {
  constructor(props) {
    this.investors = {
      tokens_sold: props.investors.tokens_sold,
      funds_raised: props.investors.funds_raised,
      total_supply_percent: props.investors.total_supply_percent,
    };
    this.launchDate = props.launchDate?.launchDate;

    this.other_coins = props.other_coins.map((coin) => ({
      coinId: coin.coinId,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      current_price: scientificToDecimal(coin.current_price.toString()),
    }));
  }

  @ApiProperty({ type: InvestorsStatsDto })
  readonly investors: InvestorsStatsDto;

  @ApiProperty()
  readonly launchDate: string;

  @ApiProperty({ type: OtherCoinsDto, isArray: true })
  readonly other_coins: OtherCoinsDto[];
}

export class SingleCoinDataOutputDto {
  @ApiProperty({ type: SingleCoinOutputDto })
  coin: SingleCoinOutputDto;

  @ApiProperty({ type: OtherStatistics })
  other: OtherStatistics;
}

export class SingleCoinResOutputDto extends ResSuccessDto {
  @ApiProperty({ type: SingleCoinDataOutputDto })
  declare data: SingleCoinDataOutputDto;
}
