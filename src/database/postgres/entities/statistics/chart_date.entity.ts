import { RegularEntity } from '@entities/regular.entity';
import { Column, Entity, JoinColumn, OneToOne, RelationId } from 'typeorm';
import { Coin } from './coin.entity';

@Entity()
export class ChartDate extends RegularEntity {
  @RelationId((chart_date: ChartDate) => chart_date.coin)
  @Column({ default: null, nullable: true })
  coinId: number;

  @OneToOne(() => Coin, (coin) => coin.chart_date)
  @JoinColumn({ name: 'coinId' })
  coin: Coin;

  @Column('varchar', { array: true, nullable: true })
  date: Array<string>;
}
