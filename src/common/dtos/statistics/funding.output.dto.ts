import { ApiProperty } from '@nestjs/swagger';
import { ResSuccessDto } from '@responses/resSuccess.dto';

class FundingInvestorOutputDto {
  @ApiProperty({ example: 'Funding Investor Id' })
  id: number;

  @ApiProperty({ example: 'Funding Investor Avatar' })
  avatar: string;

  @ApiProperty({ example: 'Funding Investor Name' })
  name: string;
}

class FundingDetailOutputDto {
  @ApiProperty({ example: 'Funding Detail Id' })
  id: number;

  @ApiProperty({ example: 'Funding Detail Avatar' })
  url: string;

  @ApiProperty({ example: 'Funding Detail Name' })
  title: string;
}

export class FundingOutputDto {
  @ApiProperty({ example: 'Funding Id' })
  id: number;

  @ApiProperty({ example: 'Funding Name' })
  name: string;

  @ApiProperty({ example: 'Funding Raised' })
  funds_raised: number;

  @ApiProperty({ example: 'Funding Tokens For Sale' })
  tokens_for_sale: number;

  @ApiProperty({ example: 'Funding Total Supply Percent' })
  total_supply_percent: number;

  @ApiProperty({ example: 'Funding Platform Picture' })
  platformPicture: string;

  @ApiProperty({ example: 'Funding Platform Name' })
  platformName: string;

  @ApiProperty({ example: 'Funding pre valuation' })
  pre_value: number;

  @ApiProperty({ example: 'Funding BNB ROI' })
  roi_bnb: number;

  @ApiProperty({ example: 'Funding BTC ROI' })
  roi_btc: number;

  @ApiProperty({ example: 'Funding ETH ROI' })
  roi_eth: number;

  @ApiProperty({ example: 'Funding USD ROI' })
  roi_usd: number;

  @ApiProperty({ example: 'No locked UP' })
  tokenDistributions: string;

  @ApiProperty({ isArray: true, type: FundingInvestorOutputDto })
  investors: FundingInvestorOutputDto[];

  @ApiProperty({ isArray: true, type: FundingDetailOutputDto })
  details: FundingDetailOutputDto[];
}

export class FundingDataOutputDto {
  @ApiProperty({ isArray: true, type: FundingOutputDto })
  funding: FundingOutputDto[];
}

export class FundingResOutputDto extends ResSuccessDto {
  @ApiProperty({ type: FundingDataOutputDto })
  declare data: FundingDataOutputDto;
}
