import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ResSuccessDto } from '@responses/resSuccess.dto';
import { T_GlobalCryptoDoc } from '@schemas/statistics/global-crypto-data.schema';

export class Period {
  @ApiProperty({ example: 47 })
  value: number;

  @ApiProperty({ example: 'Neutral' })
  valueText: string;
}

export class FgiOutputDto {
  constructor(coin: T_GlobalCryptoDoc) {
    this._id = coin._id;
  }

  @ApiProperty({ example: 'id' })
  readonly _id: Types.ObjectId;

  @ApiProperty({ type: Period })
  readonly now: Period;

  @ApiProperty({ type: Period })
  readonly previousClose: Period;

  @ApiProperty({ type: Period })
  readonly oneWeekAgo: Period;

  @ApiProperty({ type: Period })
  readonly oneMonthAgo: Period;

  @ApiProperty({ type: Period })
  readonly oneYearAgo: Period;
}

export class FgiDataOutputDto {
  @ApiProperty({ type: FgiOutputDto })
  fgiIndexes: FgiOutputDto;
}

export class FgiDataResOutputDto extends ResSuccessDto {
  @ApiProperty({ type: FgiDataOutputDto })
  declare data: FgiDataOutputDto;
}
