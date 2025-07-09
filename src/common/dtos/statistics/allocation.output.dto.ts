import { ApiProperty } from '@nestjs/swagger';
import { Allocation } from '@entities/statistics/allocation.entity';
import { VestingDetails } from '@entities/statistics/vestingDetails.entity';
import { ResSuccessDto } from '@common/responses/resSuccess.dto';

export class AllocationDataDto {
  constructor(allocation: Allocation) {
    if (!allocation) return null;

    this.totalRaise = allocation.totalRaise;
    this.vesting = allocation.vesting;
    this.totalCirculation = allocation.totalCirculation;
    this.ticker = allocation.ticker;
  }

  @ApiProperty({ example: '720M' })
  readonly totalRaise: string;
  @ApiProperty({
    example: [
      {
        stage: 'Seed Round',
        order: 3,
        color: '#3D31D7',
        price: 0.33,
        priceDisplay: '$0.33',
        tokens: 18000000,
        tokenPercent: 2.5,
        roundRaise: '5.94M',
        roundRaiseDisplay: '$5.94M',
        valuation: '238M',
        valuationDisplay: '$238M',
        vesting: '10.0% tge, 22.5% quarterly',
        vestingDisplay: '10.0% tge, 22.5% quarterly',
      },
    ],
  })
  readonly vesting: Array<VestingDetails>;

  @ApiProperty({ example: '720M' })
  readonly totalCirculation: string;

  @ApiProperty({ example: 'AVAX' })
  readonly ticker: string;
}

export class AllocationDataResDto extends ResSuccessDto {
  @ApiProperty({ type: AllocationDataDto })
  declare data: AllocationDataDto;
}
