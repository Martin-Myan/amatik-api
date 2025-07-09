import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { RegularEntity } from '@entities/regular.entity';
import { Funding } from './funding_rounds.entity';

@Entity({ name: 'funding_details' })
export class FundingDetails extends RegularEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  url: string;

  @RelationId((fundingDetails: FundingDetails) => fundingDetails.funding)
  @Column()
  fundingId: number;

  @ManyToOne(() => Funding, (funding) => funding.details, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'fundingId' })
  funding: Funding;
}
