// src/payments/entities/refund.entity.ts

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
import { RefundStatus } from '../constants/refundStatus.entity';



@Entity('refunds')
export class Refund {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Index()
    @Column()
    paymentId!: string;

  @Column('bigint')
    amount!: number;

  @Column({ length: 3 })
    currency!: string;

  @Column()
    reason!: string;

  @Column({
        type: 'enum',
        enum: RefundStatus,
        default: RefundStatus.PENDING,
    })
    status!: RefundStatus;

  @Column({ nullable: true })
  providerRefundId?: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  providerResponse?: Record<string, any>;

  @CreateDateColumn()
    createdAt!: Date;

  @ManyToOne(() => Payment, (payment) => payment.refunds, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'paymentId' })
    payment!: Payment;
}