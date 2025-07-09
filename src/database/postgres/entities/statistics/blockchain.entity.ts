import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { RegularEntity } from '@entities/regular.entity';
import { Coin } from '@entities/statistics/coin.entity';

@Entity({ name: 'blockchains' })
export class Blockchain extends RegularEntity {
  @Column({ unique: true })
  blockchainId: string;

  @RelationId((blockchain: Blockchain) => blockchain.coin)
  @Column({ nullable: true })
  coinId: number;

  @OneToOne(() => Coin, (coin) => coin.blockchain)
  @JoinColumn({ name: 'coinId' })
  coin: Coin;

  @Column({ type: Number, nullable: true, default: null })
  dapps: number;

  @Column({ type: String, nullable: true, default: null })
  uaw: number;
}
