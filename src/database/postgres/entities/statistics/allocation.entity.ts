import { Column, Entity, JoinColumn, OneToMany, RelationId } from 'typeorm';
import { RegularEntity } from '@entities/regular.entity';
import { VestingDetails } from './vestingDetails.entity';
import { Coin } from './coin.entity';

@Entity({ name: 'allocation' })
export class Allocation extends RegularEntity {
  @Column({ type: 'varchar', nullable: true })
  totalRaise: string | null;

  @Column({ type: 'varchar', nullable: true })
  totalCirculation: string | null;

  @Column({ type: 'varchar' })
  ticker: string;

  @OneToMany(
    () => VestingDetails,
    (vestingDetails) => vestingDetails.allocation,
    { cascade: true },
  )
  vesting: VestingDetails[];

  @RelationId((allocation: Allocation) => allocation.coin)
  @Column({ default: null, nullable: true })
  coinId: number;

  @OneToMany(() => Coin, (coin) => coin.allocation)
  @JoinColumn({ name: 'coinId' })
  coin: Coin;
}
