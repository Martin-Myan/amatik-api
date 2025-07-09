import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { RegularEntity } from '@entities/regular.entity';
import { Allocation } from './allocation.entity';

@Entity()
export class VestingDetails extends RegularEntity {
  @RelationId((vestingDetails: VestingDetails) => vestingDetails.allocation)
  @Column({ nullable: true })
  allocationId: number;

  @ManyToOne(() => Allocation, (allocation) => allocation.vesting)
  @JoinColumn({ name: 'allocationId' })
  allocation: Allocation;

  @Column({ type: 'varchar', nullable: true })
  stageName: string | null;

  @Column({ nullable: true })
  order: number | null;

  @Column({ length: 10, nullable: true })
  color: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number | null;

  @Column({ nullable: true })
  priceDisplay: string | null;

  @Column({ type: 'numeric', nullable: true })
  tokens: number | null;

  @Column({ type: 'numeric', nullable: true })
  tokenPercent: number | null;

  @Column({ nullable: true })
  roundRaise: string | null;

  @Column({ nullable: true })
  roundRaiseDisplay: string | null;

  @Column({ nullable: true })
  valuation: string | null;

  @Column({ nullable: true })
  valuationDisplay: string | null;

  @Column({ nullable: true })
  vesting: string | null;

  @Column({ nullable: true })
  vestingDisplay: string | null;
}
