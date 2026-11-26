

import { ObservationQuarantineIdentityConflictError } from 'src/observability/contracts/delivery/durable/quarantine/error/observation-quarantine-identity-conflict-error.class';
import { QuarantineStore } from 'src/observability/contracts/delivery/durable/quarantine/observation-quarantine-store.interface';
import { QuarantinedBatch } from 'src/observability/contracts/delivery/durable/quarantine/observation-quarantine.interface';
import { DataSource, EntityManager } from 'typeorm';


/**
 * Represents a quarantined batch as returned by PostgreSQL.
 */
interface StoredQuarantinedBatchRow {
  batchId: string;
  observations: unknown;
  failure: unknown;
  quarantinedAt: number;
}

/**
 * Persists quarantined observation batches in PostgreSQL.
 *
 * Guarantees:
 * - Batch IDs are unique.
 * - Identical retries succeed idempotently.
 * - Reusing a batch ID with different logical content is rejected.
 * - A successful write means the batch is durably retained.
 */
export class PostgresQuarantineStore implements QuarantineStore {
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async write(batch: QuarantinedBatch): Promise<void> {
    await this.dataSource.transaction(
      async (manager: EntityManager): Promise<void> => {
        await this.persistOne(manager, batch);
      },
    );
  }

  private async persistOne(
    manager: EntityManager,
    batch: QuarantinedBatch,
  ): Promise<void> {
    const inserted = (await manager.query(
      `
        INSERT INTO quarantined_observation_batches (
          batch_id,
          observations,
          failure,
          quarantined_at
        )
        VALUES (
          $1,
          $2::jsonb,
          $3::jsonb,
          $4
        )
        ON CONFLICT (batch_id) DO NOTHING
        RETURNING batch_id
      `,
      [
        batch.batchId,
        JSON.stringify(batch.observations),
        JSON.stringify(batch.failure),
        batch.quarantinedAt,
      ],
    )) as Array<{ batch_id: string }>;

    if (inserted.length > 0) {
      return;
    }

    // The batch ID already exists, so determine whether this
    // is an identical retry or a conflicting reuse.
    const existing = await this.findByBatchId(
      manager,
      batch.batchId,
    );

    if (!existing) {
      throw new Error(
        'Quarantine insert was ignored, but the existing batch could not be found.',
      );
    }

    this.assertSameBatch(existing, batch);
  }

  private async findByBatchId(
    manager: EntityManager,
    batchId: string,
  ): Promise<StoredQuarantinedBatchRow | undefined> {
    const rows = (await manager.query(
      `
        SELECT
          batch_id AS "batchId",
          observations,
          failure,
          quarantined_at AS "quarantinedAt"
        FROM quarantined_observation_batches
        WHERE batch_id = $1
        LIMIT 1
      `,
      [batchId],
    )) as StoredQuarantinedBatchRow[];

    return rows[0];
  }

  private assertSameBatch(
    existing: StoredQuarantinedBatchRow,
    incoming: QuarantinedBatch,
  ): void {
    const sameContent =
      existing.batchId === incoming.batchId &&
      existing.quarantinedAt === incoming.quarantinedAt &&
      canonicalJson(existing.observations) ===
        canonicalJson(incoming.observations) &&
      canonicalJson(existing.failure) ===
        canonicalJson(incoming.failure);

    if (!sameContent) {
      throw new ObservationQuarantineIdentityConflictError(
        incoming.batchId,
      );
    }
  }
}

/**
 * Produces a stable representation of JSON-compatible values.
 *
 * Object key order does not affect equality.
 * Array order remains significant.
 */
function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value) ?? 'undefined';
  }

  if (Array.isArray(value)) {
    return `[${value.map(canonicalJson).join(',')}]`;
  }

  const record = value as Record<string, unknown>;

  const entries = Object.keys(record)
    .sort()
    .map(
      key =>
        `${JSON.stringify(key)}:${canonicalJson(record[key])}`,
    );

  return `{${entries.join(',')}}`;
}
