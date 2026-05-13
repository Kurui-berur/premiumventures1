// src/payments/entities/ledger-entry.entity.ts

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
import { LedgerEntryType } from '../constants/ledgerEntryType.constants';


@Entity('ledger_entries')
export class LedgerEntry {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Index()
    @Column()
    paymentId!: string;

  @Index()
    @Column()
    accountId!: string;

  @Column({
        type: 'enum',
        enum: LedgerEntryType,
    })
    type!: LedgerEntryType;

  @Column('bigint')
    amount!: number;

  @Column({ length: 3 })
    currency!: string;

  @Column()
    description!: string;

  @CreateDateColumn()
    createdAt!: Date;

  @ManyToOne(() => Payment, (payment) => payment.ledgerEntries, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'paymentId' })
    payment!: Payment;
}