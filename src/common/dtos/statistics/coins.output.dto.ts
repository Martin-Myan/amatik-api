import { ApiProperty } from '@nestjs/swagger';
import { ResSuccessDto } from '@responses/resSuccess.dto';
import { scientificToDecimal } from '@utils/scientificToDecimal';
import { Coin } from '@entities/statistics/coin.entity';

class CoinSingleStatDto {
  @ApiProperty({ example: 0.47386 })
  readonly percent: number;
  @ApiProperty({ example: 'usd' })
  readonly baseCurrency: string;
}

class CoinStatisticsDto {
  @ApiProperty({ type: CoinSingleStatDto })
  readonly hourStat: CoinSingleStatDto[];

  @ApiProperty({ type: CoinSingleStatDto })
  readonly dailyStat: CoinSingleStatDto[];

  @ApiProperty({ type: CoinSingleStatDto })
  readonly weeklyStat: CoinSingleStatDto[];
}

export class CoinDataDto {
  constructor(coin: Coin) {
    this.id = coin.id;
    this.coinId = coin.coinId;
    this.index = coin.index;
    this.name = coin.name;
    this.image = coin.image;
    this.current_price = scientificToDecimal(coin.current_price.toString());
    this.market_cap = coin.market_cap;
    this.high_24h = coin.total_volume;
    this.total_volume = coin.total_volume;
  }

  @ApiProperty({ example: 'coinId' })
  readonly id: number;

  @ApiProperty({ example: 'bitcoin' })
  readonly coinId: string;

  @ApiProperty({ example: 1 })
  readonly index: number;

  @ApiProperty({ example: 'Bitcoin' })
  readonly name: string;

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
  readonly total_volume: number;

  @ApiProperty({ type: CoinStatisticsDto })
  readonly statistics: CoinStatisticsDto;
}

export class CoinDataOutputDto {
  @ApiProperty({ type: CoinDataDto })
  coins: CoinDataDto[];
  @ApiProperty()
  count: number;
}

export class CoinDataResOutputDto extends ResSuccessDto {
  @ApiProperty({ type: CoinDataOutputDto })
  declare data: CoinDataOutputDto;
}
