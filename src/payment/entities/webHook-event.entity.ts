// src/payments/entities/webhook-event.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('webhook_events')
export class WebhookEvent {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Index()
    @Column()
    provider!: string;

  @Index()
    @Column()
    eventType!: string;

  @Index({ unique: true })
    @Column()
    externalEventId!: string;

  @Column({
        type: 'jsonb',
    })
    payload!: Record<string, any>;

  @Column({ default: false })
    processed!: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  processedAt?: Date;

  @Column({ nullable: true })
  processingError?: string;

  @CreateDateColumn()
    receivedAt!: Date;
}