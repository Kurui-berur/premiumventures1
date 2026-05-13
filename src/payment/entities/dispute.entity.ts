// src/payments/entities/dispute.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

import { Payment } from './payment.entity';
import { DisputeStatus } from '../constants/disputeStatus.constants';



@Entity('disputes')
export class Dispute {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Index()
    @Column()
    paymentId!: string;

  @Column()
    reason!: string;

  @Column({
        type: 'enum',
        enum: DisputeStatus,
        default: DisputeStatus.OPEN,
    })
    status!: DisputeStatus;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  evidence?: Record<string, any>;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  resolvedAt?: Date;

  @CreateDateColumn()
    createdAt!: Date;

  @ManyToOne(() => Payment, (payment) => payment.disputes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'paymentId' })
    payment!: Payment;
}