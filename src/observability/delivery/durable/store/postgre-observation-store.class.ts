
import type { ObservationStore } from 'src/observability/contracts/delivery/durable/observation-store.interface';
import type { Observation } from 'src/observability/contracts/observation/observation.interface';
import { DataSource, EntityManager } from 'typeorm';

import { ObservationIdentityConflictError } from '../errors/observation-identity-conflict-error.class';
import { ObservationStreamPositionConflictError } from '../errors/observation-stream-position-stream-error.class';

/**
 * Represents an observation as returned by PostgreSQL.
 *
 * The SQL aliases map database column names to the names
 * used by our Observation model.
 */
interface StoredObservationRow {
  id: string;
  type: string;
  timestamp: number;
  scopeId: string;
  streamId: string;
  parentScopeId: string | null;
  sequence: number;
  causedBy: readonly string[] | null;
  payload: unknown;
}

interface InsertedObservationRow {
  observation_id: string;
}

/**
 * Persists observations in PostgreSQL.
 *
 * Guarantees:
 * - A batch is committed atomically.
 * - Repeating an identical observation is idempotent.
 * - Reusing an observation ID with different content is rejected.
 * - Reusing a stream position for another observation is rejected.
 */
export class PostgresObservationStore
  implements ObservationStore
{
  constructor(
    private readonly dataSource: DataSource,
  ) {}

  async writeBatch(
    observations: readonly Observation[],
  ): Promise<void> {
    if (observations.length === 0) {
      return;
    }

    await this.dataSource.transaction(
      async (manager: EntityManager): Promise<void> => {
        for (const observation of observations) {
          await this.persistOne(manager, observation);
        }
      },
    );
  }

  /**
   * Attempts to insert one observation.
   *
   * PostgreSQL handles concurrent uniqueness conflicts.
   * If the insert is ignored, we inspect the existing record
   * to determine whether this is an idempotent retry or a conflict.
   */
  private async persistOne(
    manager: EntityManager,
    observation: Observation,
  ): Promise<void> {
    const inserted = (await manager.query(
      `
        INSERT INTO observations (
          observation_id,
          type,
          timestamp,
          scope_id,
          stream_id,
          parent_scope_id,
          sequence,
          caused_by,
          payload
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8::jsonb,
          $9::jsonb
        )
        ON CONFLICT DO NOTHING
        RETURNING observation_id
      `,
      [
        observation.id,
        observation.type,
        observation.timestamp,
        observation.context.scopeId,
        observation.context.streamId,
        observation.context.parentScopeId ?? null,
        observation.sequence,
        observation.causedBy == null
          ? null
          : JSON.stringify(observation.causedBy),
        JSON.stringify(observation.payload),
      ],
    )) as InsertedObservationRow[];

    if (inserted.length > 0) {
      return;
    }

    // The insert was ignored because a uniqueness constraint
    // was violated. Determine which domain rule was violated.
    await this.resolveConflict(manager, observation);
  }

  /**
   * Determines why PostgreSQL ignored the insert.
   *
   * Observation identity takes precedence when the ID already
   * exists. Otherwise, we check the stream position.
   */
  private async resolveConflict(
    manager: EntityManager,
    incoming: Observation,
  ): Promise<void> {
    const existingById = await this.findById(
      manager,
      incoming.id,
    );

    if (existingById) {
      this.assertSameObservation(existingById, incoming);
      return;
    }

    const existingAtPosition = await this.findAtPosition(
      manager,
      incoming.context.scopeId,
      incoming.context.streamId,
      incoming.sequence,
    );

    if (existingAtPosition) {
      throw new ObservationStreamPositionConflictError(
        incoming.context.scopeId,
        incoming.context.streamId,
        incoming.sequence,
        existingAtPosition.id,
        incoming.id,
      );
    }

    // The insert was ignored, but neither known uniqueness
    // conflict can explain it. Do not silently accept the write.
    throw new Error(
      'Observation insert was ignored, but no conflicting record was found.',
    );
  }

  /**
   * Finds an observation by its globally unique ID.
   */
  private async findById(
    manager: EntityManager,
    id: string,
  ): Promise<StoredObservationRow | undefined> {
    const rows = (await manager.query(
      `
        SELECT
          observation_id AS "id",
          type,
          timestamp,
          scope_id AS "scopeId",
          stream_id AS "streamId",
          parent_scope_id AS "parentScopeId",
          sequence,
          caused_by AS "causedBy",
          payload
        FROM observations
        WHERE observation_id = $1
        LIMIT 1
      `,
      [id],
    )) as StoredObservationRow[];

    return rows[0];
  }

  /**
   * Finds an observation occupying a particular stream position.
   */
  private async findAtPosition(
    manager: EntityManager,
    scopeId: string,
    streamId: string,
    sequence: number,
  ): Promise<StoredObservationRow | undefined> {
    const rows = (await manager.query(
      `
        SELECT
          observation_id AS "id",
          type,
          timestamp,
          scope_id AS "scopeId",
          stream_id AS "streamId",
          parent_scope_id AS "parentScopeId",
          sequence,
          caused_by AS "causedBy",
          payload
        FROM observations
        WHERE scope_id = $1
          AND stream_id = $2
          AND sequence = $3
        LIMIT 1
      `,
      [scopeId, streamId, sequence],
    )) as StoredObservationRow[];

    return rows[0];
  }

  /**
   * Verifies that an existing observation with the same ID
   * has exactly the same logical content.
   *
   * JSON object key order is ignored. Array order matters.
   */
  private assertSameObservation(
    existing: StoredObservationRow,
    incoming: Observation,
  ): void {
    const sameContent =
      existing.type === incoming.type &&
      existing.timestamp === incoming.timestamp &&
      existing.scopeId === incoming.context.scopeId &&
      existing.streamId === incoming.context.streamId &&
      existing.parentScopeId ===
        (incoming.context.parentScopeId ?? null) &&
      existing.sequence === incoming.sequence &&
      canonicalJson(existing.causedBy) ===
        canonicalJson(incoming.causedBy ?? null) &&
      canonicalJson(existing.payload) ===
        canonicalJson(incoming.payload);

    if (!sameContent) {
      throw new ObservationIdentityConflictError(
        incoming.id,
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
