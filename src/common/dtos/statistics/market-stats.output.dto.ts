import { ApiProperty } from '@nestjs/swagger';
import { ResSuccessDto } from '@responses/resSuccess.dto';

export class DominanceCoin {
  @ApiProperty({ example: 'btc' })
  readonly coinSymbol: string;

  @ApiProperty({ example: '0.4' })
  readonly percent: string;

  @ApiProperty({
    example:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  })
  readonly image: string;
}

export class MarketStatsOutputDto {
  @ApiProperty({ type: Number, example: 10189 })
  cryptoCount: number;

  @ApiProperty({ type: String, example: '1119048166859.3474' })
  marketCap: string;

  @ApiProperty({ type: String, example: '0.3457785983355121' })
  marketCapPercent: string;

  @ApiProperty({ type: String, example: '35885297120.4497' })
  dayVol: string;

  @ApiProperty({ isArray: true, type: DominanceCoin })
  dominanceCoins: Array<DominanceCoin>;
}

export class MarketStatsDataOutputDto {
  @ApiProperty({ type: MarketStatsOutputDto })
  globalMarketStats: MarketStatsOutputDto;
}

export class MarketStatsResOutputDto extends ResSuccessDto {
  @ApiProperty({ type: MarketStatsDataOutputDto })
  declare data: MarketStatsDataOutputDto;
}
