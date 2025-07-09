import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { RegularEntity } from '@entities/regular.entity';
import { Coin } from '@entities/statistics/coin.entity';
import { Investor } from '@entities/statistics/investor.entity';
import { FundingDetails } from '@entities/statistics/funding_details.entity';

@Entity({ name: 'funding_rounds' })
export class Funding extends RegularEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  start_date: Date;

  @Column({ type: 'varchar', nullable: true, default: null })
  avatar: string;

  @Column({ type: 'double precision', nullable: true, default: null })
  price: number;

  @Column({ type: 'int', unique: true })
  slug: number;

  @Column({ type: 'bigint', nullable: true, default: null })
  funds_raised: number;

  @Column({ type: 'double precision', nullable: true, default: null })
  tokens_for_sale: number;

  @Check(`"total_supply_percent" >= 0 AND "total_supply_percent" <= 100`)
  @Column({ type: 'double precision', nullable: true, default: null })
  total_supply_percent: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  platformName: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  platformPicture: string;

  @Column({ type: 'double precision' })
  pre_value: number;

  @Column({ type: 'double precision', nullable: true, default: null })
  roi_usd: number;

  @Column({ type: 'double precision', nullable: true, default: null })
  roi_btc: number;

  @Column({ type: 'double precision', nullable: true, default: null })
  roi_eth: number;

  @Column({ type: 'double precision', nullable: true, default: null })
  roi_bnb: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  distribution_type: string;

  @RelationId((funding: Funding) => funding.coin)
  @Column({ nullable: true })
  coinId: number;

  @ManyToOne(() => Coin, (coin) => coin.fundings)
  @JoinColumn({ name: 'coinId' })
  coin: Coin;

  @OneToMany(() => FundingDetails, (fundingDetails) => fundingDetails.funding, {
    cascade: true,
  })
  details: FundingDetails[];

  @OneToMany(() => Investor, (investor) => investor.funding)
  investors: Investor[];
}
