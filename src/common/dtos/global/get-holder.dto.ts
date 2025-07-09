import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ResSuccessDto } from '@responses/resSuccess.dto';
import { ChainBase } from '@enums/chainbase.enum';

export class GetHoldersDto {
  @IsNotEmpty()
  @IsEnum(ChainBase)
  @ApiProperty({ example: 'bscanHolders', enum: ChainBase })
  chainBase: ChainBase;
}

export class GetHoldersOutputDto {
  @ApiProperty({ example: 2000000 })
  holdersCount: number;
}

export class GetHoldersResponseOutputDto extends ResSuccessDto {
  @ApiProperty({ type: GetHoldersOutputDto })
  declare data: GetHoldersOutputDto;
}

export class GlobalCryptoInfoDto {
  @ApiProperty({
    example:
      'https://bscscan.com/token/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  })
  @IsEmail()
  url: string;
}
