import { QuarantinedBatch } from "./observation-quarantine.interface";

/**
 * Defines the persistence contract for quarantined observation batches.
 *
 * The store is responsible for durable retention and batch identity.
 * It does not decide whether a failed delivery should be quarantined;
 * that decision belongs to the retry policy.
 *
 * Implementations must support idempotent writes:
 * - The same batch ID and identical logical content succeeds.
 * - The same batch ID with different logical content is rejected.
 *
 * A successful promise means the batch has been durably stored,
 * or an identical batch with that ID was already stored.
 */
export interface QuarantineStore {
  /**
   * Durably persists a quarantined batch.
   *
   * @throws ObservationQuarantineIdentityConflictError
   * when the batch ID already exists with different content.
   *
   * A rejected promise does not necessarily mean that nothing
   * was persisted. Callers must safely handle uncertain outcomes.
   */
  write(
    batch: QuarantinedBatch,
  ): Promise<void>;
}
