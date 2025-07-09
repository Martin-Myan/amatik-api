import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  RelationId,
} from 'typeorm';
import { RegularEntity } from './../regular.entity';
import { Blockchain } from './blockchain.entity';
import { Investor } from './investor.entity';
import { Funding } from './funding_rounds.entity';
import { Allocation } from './allocation.entity';
import { ChartDataset } from './chart_dataset.entity';
import { ChartDate } from './chart_date.entity';

@Entity({ name: 'coins' })
export class Coin extends RegularEntity {
  @Column({ unique: true })
  coinId: string;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column({ type: 'decimal', precision: 20, scale: 10 })
  current_price: number;

  @Column()
  symbol: string;

  @Column({ type: 'text', nullable: true, default: null })
  description: string;

  @Column({ type: Number, nullable: true, default: null })
  index: number;

  @Column({ type: Number, nullable: true, default: null })
  developers: number;

  @Column({ type: 'decimal', precision: 30, scale: 10 })
  market_cap: number;

  @Column({ type: 'decimal', nullable: true, precision: 30, scale: 10 })
  max_supply: number;

  @Column({ type: 'decimal', nullable: true, precision: 30, scale: 10 })
  total_supply: number;

  @Column({ type: 'decimal', precision: 30, scale: 10 })
  circulating_supply: number;

  @Column({ type: 'decimal', nullable: true, precision: 30, scale: 10 })
  high_24h: number;

  @Column({ type: 'decimal', precision: 30, scale: 10 })
  total_volume: number;

  @Column({ type: 'decimal', precision: 25, scale: 20, nullable: true })
  price_change_percentage_1h: number;

  @Column({ type: 'decimal', precision: 25, scale: 20, nullable: true })
  price_change_percentage_24h: number;

  @Column({ type: 'decimal', precision: 25, scale: 20, nullable: true })
  price_change_percentage_7d: number;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  market_cap_change_percentage_24h: number;

  @Column({ type: String, nullable: true })
  homepage: string;

  @Column({ type: String, nullable: true })
  facebook_url: string;

  @Column({ type: String, nullable: true })
  twitter_url: string;

  @Column({ type: String, nullable: true })
  telegram_url: string;

  @Column({ type: String, nullable: true })
  subreddit_url: string;

  @Column({ type: String, nullable: true })
  repo_url: string;

  @Column({ type: String, nullable: true })
  chat_url: string;

  @Column({ type: String, nullable: true })
  launchDate: string;

  @RelationId((coin: Coin) => coin.blockchain)
  @Column({ default: null, nullable: true })
  blockchainId: number;

  @Column({ type: 'jsonb', nullable: true })
  sparkline_in_7d: string;

  @OneToOne(() => Blockchain, (blockchain) => blockchain.coin)
  @JoinColumn()
  blockchain: Blockchain;

  @OneToMany(() => Investor, (investor) => investor.coin)
  investors: Investor[];

  @OneToMany(() => Funding, (funding) => funding.coin)
  fundings: Funding[];

  @OneToMany(() => Allocation, (allocation) => allocation.coin)
  allocation: Allocation[];

  @OneToMany(() => ChartDataset, (chartDataset) => chartDataset.coin, {
    cascade: true,
  })
  chart: ChartDataset[];

  @OneToOne(() => ChartDate, (chart_date) => chart_date.coin)
  chart_date: ChartDate[];
}
