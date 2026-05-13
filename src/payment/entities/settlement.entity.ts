// src/payments/entities/settlement.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

export enum SettlementStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SETTLED = 'SETTLED',
  FAILED = 'FAILED',
}

@Entity('settlements')
export class Settlement {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Index()
    @Column()
    provider!: string;

  @Index({ unique: true })
    @Column()
    settlementReference!: string;

  @Column('bigint')
    amount!: number;

  @Column({ length: 3 })
    currency!: string;

  @Column({
        type: 'enum',
        enum: SettlementStatus,
        default: SettlementStatus.PENDING,
    })
    status!: SettlementStatus;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  settledAt?: Date;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  metadata?: Record<string, any>;

  @CreateDateColumn()
    createdAt!: Date;
}