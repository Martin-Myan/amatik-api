import {
  Check,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { RegularEntity } from '@entities/regular.entity';
import { Coin } from '@entities/statistics/coin.entity';
import { Funding } from '@entities/statistics/funding_rounds.entity';

@Entity({ name: 'investors' })
export class Investor extends RegularEntity {
  @RelationId((investor: Investor) => investor.coin)
  @Column()
  coinId: number;

  @ManyToOne(() => Coin, (coin) => coin.investors)
  @JoinColumn({ name: 'coinId' })
  coin: Coin;

  @RelationId((investor: Investor) => investor.funding)
  @Column({ nullable: true })
  fundingId: number;

  @ManyToOne(() => Funding, (funding) => funding.investors)
  @JoinColumn({ name: 'fundingId' })
  funding: Funding;

  @Column({ type: String })
  name: string;

  @Column({ type: String, nullable: true, length: 255 })
  avatar: string;

  @Check(`"rating" >= 0 AND "rating" <= 5`)
  @Column({ type: Number })
  rating: number;

  @Column({ type: String, nullable: true })
  tier: string;

  @Column({ type: String, length: 255, nullable: true })
  type: string;

  @Column({ type: String, length: 255, nullable: true })
  stage: string;
}
