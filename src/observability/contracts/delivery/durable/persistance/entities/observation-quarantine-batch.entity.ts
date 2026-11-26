import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

import type { JsonValue } from 'src/observability/contracts/observation/observation.interface';

/**
 * Represents a durably persisted quarantined observation batch.
 *
 * The batch ID is the stable identity used for idempotent
 * quarantine acceptance.
 */
@Entity('quarantined_observation_batches')
export class ObservationQuarantinedBatchEntity {
  /**
   * Stable identity of the logical quarantine batch.
   */
  @PrimaryColumn({
    name: 'batch_id',
    type: 'text',
  })
  batchId!: string;

  /**
   * Original observations, preserved as JSONB.
   */
  @Column({
    type: 'jsonb',
  })
  observations!: JsonValue;

  /**
   * Failure details that caused the batch to be quarantined.
   */
  @Column({
    type: 'jsonb',
  })
  failure!: JsonValue;

  /**
   * Timestamp from the original QuarantinedBatch.
   *
   * This value remains unchanged when acceptance is retried.
   */
  @Column({
    name: 'quarantined_at',
    type: 'double precision',
  })
  quarantinedAt!: number;

  /**
   * Database time when this record was first inserted.
   *
   * Unlike quarantinedAt, this is managed by the database
   * and is not changed during an idempotent retry.
   */
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt!: Date;
}