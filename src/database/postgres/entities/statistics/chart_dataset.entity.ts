import { RegularEntity } from '@entities/regular.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Coin } from './coin.entity';

@Entity()
export class ChartDataset extends RegularEntity {
  @RelationId((chart_dataset: ChartDataset) => chart_dataset.coin)
  @Column({ default: null, nullable: true })
  coinId: number;

  @ManyToOne(() => Coin, (coin) => coin.chart)
  @JoinColumn({ name: 'coinId' })
  coin: Coin;

  @Column({ type: 'varchar' })
  label: string;

  @Column({ type: 'varchar' })
  bg_color: string;

  @Column('numeric', { array: true })
  data: Array<number>;
}
