import { ApiProperty } from '@nestjs/swagger';
import { Blockchain } from '@entities/statistics/blockchain.entity';

export class BlockchainDataDto {
  constructor(blockchain: Blockchain) {
    if (!blockchain) return null;

    this.dapps = blockchain.dapps;
    this.uaw = blockchain.uaw;
  }

  @ApiProperty({ example: 123123 })
  readonly dapps: number;

  @ApiProperty({ example: 121231233123 })
  readonly uaw: number;
}
