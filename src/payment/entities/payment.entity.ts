import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PaymentStatus } from "../constants/paymentStatus.constants";
import { PaymentProvider } from "../constants/paymentProvider.constant";
import { Dispute } from "./dispute.entity";
import { LedgerEntry } from "./ledger-entry.entity";
import { PaymentAttempt } from "./payment-atempt.entity";
import { PaymentEvent } from "./payment-event.entity";
import { Refund } from "./refund.entity";

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Index({ unique: true })
    @Column()
    reference!: string;

  @Index({ unique: true })
    @Column()
    idempotencyKey!: string;

  @Index()
    @Column()
    customerId!: string;

  @Column('bigint')
    amount!: number;

  @Column({ length: 3 })
    currency!: string;

  @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING,
    })
    status!: PaymentStatus;

  @Column({
        type: 'enum',
        enum: PaymentProvider,
    })
    provider!: PaymentProvider;

  @Index()
  @Column({ nullable: true })
  providerTransactionId?: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  metadata?: Record<string, any>;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  providerResponse?: Record<string, any>;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  failureReason?: string;

  @Column({ default: false })
    webhookConfirmed!: boolean;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  completedAt?: Date;

  @CreateDateColumn()
    createdAt!: Date;

  @UpdateDateColumn()
    updatedAt!: Date;

  // RELATIONS

  @OneToMany(() => PaymentAttempt, (attempt) => attempt.payment)
    attempts!: PaymentAttempt[];

  @OneToMany(() => Refund, (refund) => refund.payment)
    refunds!: Refund[];

  @OneToMany(() => PaymentEvent, (event) => event.payment)
    events!: PaymentEvent[];

  @OneToMany(() => LedgerEntry, (entry) => entry.payment)
    ledgerEntries!: LedgerEntry[];

  @OneToMany(() => Dispute, (dispute) => dispute.payment)
  disputes!: Dispute[];
}






    



    