// src/payments/entities/payment-event.entity.ts

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
import { PaymentEventType } from '../constants/paymentEventType.constant';



@Entity('payment_events')
export class PaymentEvent {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Index()
    @Column()
    paymentId!: string;

  @Column({
        type: 'enum',
        enum: PaymentEventType,
    })
    type!: PaymentEventType;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  payload?: Record<string, any>;

  @CreateDateColumn()
    createdAt!: Date;

  @ManyToOne(() => Payment, (payment) => payment.events, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'paymentId' })
    payment!: Payment;
}