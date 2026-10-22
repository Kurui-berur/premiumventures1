import { Observation } from "../../observation/observation.interface";

/**
 * Defines the contract for durably storing observations.
 *
 * The store is the authoritative persistence boundary for observations.
 * It enforces observation identity, stream-position uniqueness,
 * idempotent writes, and atomic batch persistence.
 *
 * Implementations must preserve these guarantees regardless of
 * the underlying persistence technology.
 */
export interface ObservationStore {
  /**
   * Persists a batch of observations as one atomic operation.
   *
   * The implementation must ensure that either the entire batch is
   * committed or none of it is committed.
   *
   * Repeating a batch containing observations already stored with
   * identical logical content must succeed without creating duplicates.
   *
   * The implementation must reject conflicting observation identities
   * and stream positions using the corresponding domain errors.
   *
   * Runtime validation of observation data must be completed before
   * persistence is attempted by the downstream delivery pipeline.
   *
   * The promise resolves only when the batch has been durably committed
   * or when all observations are already stored with identical content.
   *
   * If the promise rejects, the caller must not assume that no data
   * was committed, because the transaction outcome may be uncertain.
   *
   * @param observations - Observations to persist as one atomic batch.
   * @returns A promise that resolves after durable acceptance.
   * @throws ObservationIdentityConflictError when an observation ID
   * identifies different logical content from the stored observation.
   * @throws ObservationStreamPositionConflictError when a different
   * observation ID already occupies the same stream position.
   */
  writeBatch(
    observations: readonly Observation[],
  ): Promise<void>;
}