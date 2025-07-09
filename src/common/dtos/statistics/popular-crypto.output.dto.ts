import { ApiProperty } from '@nestjs/swagger';
import { ResSuccessDto } from '@responses/resSuccess.dto';

export class PopularCoinOutputDto {
  @ApiProperty({
    example:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  })
  readonly image: string;

  @ApiProperty({ example: 26351 })
  readonly current_price: string;

  @ApiProperty({ example: 'bitcoin' })
  readonly coinId: string;

  @ApiProperty({ example: 'BTC' })
  readonly symbol: string;

  @ApiProperty({ example: 'Bitcoin' })
  readonly name: string;
}

export class PopularCoinsDataOutputDto {
  @ApiProperty({ isArray: true, type: PopularCoinOutputDto })
  popularCoins: PopularCoinOutputDto[];
}

export class PopularCoinsResOutputDto extends ResSuccessDto {
  @ApiProperty({ isArray: true, type: PopularCoinsDataOutputDto })
  declare data: PopularCoinsDataOutputDto;
}
