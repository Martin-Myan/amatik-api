import { ApiProperty } from '@nestjs/swagger';
import { ResSuccessDto } from '@responses/resSuccess.dto';

export class ChainStatsPreOutputDto {
  @ApiProperty({
    type: String,
    example:
      'https://assets.coingecko.com/coins/images/7598/large/wrapped_bitcoin_wbtc.png?1696507857',
  })
  image: string;

  @ApiProperty({ type: String, example: 'WrappedBitcoin' })
  chainName: string;

  @ApiProperty({
    type: String,
    example: 'binancecoin unique to navigate to single page',
  })
  coinId: string;

  @ApiProperty({ type: String, example: 4485267910 })
  market_cap: number;

  @ApiProperty({ type: String, example: 27533 })
  current_price: number;

  @ApiProperty({ example: 25434 })
  uaw: number;

  @ApiProperty({ example: 275 })
  developers: number;

  @ApiProperty({ example: 272343243 })
  dapps: number;
}

export class ChainStatsOutputDto {
  @ApiProperty({ isArray: true, type: ChainStatsPreOutputDto })
  rankingData: ChainStatsPreOutputDto[];

  @ApiProperty({ example: 150 })
  count: number;
}

export class ChainStatsResOutputDto extends ResSuccessDto {
  @ApiProperty({ type: ChainStatsPreOutputDto })
  declare data: ChainStatsOutputDto;
}
