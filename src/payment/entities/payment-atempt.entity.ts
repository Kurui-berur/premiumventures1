// src/payments/entities/payment-attempt.entity.ts

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
import { PaymentAttemptStatus } from '../constants/paymentAttemptStatus.constants';

@Entity('payment_attempts')
export class PaymentAttempt {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Index()
    @Column()
    paymentId!: string;

  @Column()
    attemptNumber!: number;

  @Column()
    provider!: string;

  @Column({
        type: 'enum',
        enum: PaymentAttemptStatus,
        default: PaymentAttemptStatus.PENDING,
    })
    status!: PaymentAttemptStatus;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  requestPayload?: Record<string, any>;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  responsePayload?: Record<string, any>;

  @Column({ nullable: true })
  providerReference?: string;

  @Column({ nullable: true })
  failureReason?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  completedAt?: Date;

  @CreateDateColumn()
    createdAt!: Date;

  @ManyToOne(() => Payment, (payment) => payment.attempts, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'paymentId' })
    payment!: Payment;
}