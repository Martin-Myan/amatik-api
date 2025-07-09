import { ApiProperty } from '@nestjs/swagger';
import { ResSuccessDto } from '@responses/resSuccess.dto';

export class InvestorsOutputDto {
  constructor(props) {
    this.id = props.id;
    this.avatar = props.avatar;
    this.name = props.name;
    this.rating = props.rating;
    this.type = props.type;
    this.stage = props.stage;
  }

  @ApiProperty({ example: 1 })
  readonly id: number;

  @ApiProperty({
    example:
      'https://dropsearn.fra1.cdn.digitaloceanspaces.com/static/ventures_capital/logos/mZtl_Z_a_400x400.png',
  })
  readonly avatar: string;

  @ApiProperty({ example: 'investor name' })
  readonly name: string;

  @ApiProperty({ example: 3, description: 'from 1 to 5 numbers' })
  readonly rating: number;

  @ApiProperty({ example: 'Investor Type' })
  readonly type: string;

  @ApiProperty({ example: 'Investor Stage' })
  readonly stage: string;
}

export class InvestorDataOutputDto {
  @ApiProperty({ isArray: true, type: InvestorsOutputDto })
  investors: InvestorsOutputDto[];

  @ApiProperty({ example: 1 })
  readonly count: number;
}

export class InvestorsResOutputDto extends ResSuccessDto {
  @ApiProperty({ type: InvestorDataOutputDto })
  declare data: InvestorDataOutputDto;
}
