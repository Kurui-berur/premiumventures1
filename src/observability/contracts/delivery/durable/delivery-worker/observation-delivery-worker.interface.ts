/**
 * Defines the lifecycle boundary for the observation delivery worker.
 *
 * The worker coordinates buffer draining, durable writes, retries,
 * quarantine, and failure reporting. It does not own the observations
 * themselves; the buffer and durable store retain their respective
 * ownership responsibilities.
 */
export interface ObservationDeliveryWorker {
  /**
   * Starts the delivery worker.
   *
   * The worker begins monitoring for available observations and
   * delivering claimed batches according to its configured policy.
   *
   * Starting the worker must ensure that observations already waiting
   * in the buffer can be discovered, even if they arrived before
   * the worker started.
   *
   * @returns A promise that resolves when the worker has started.
   */
  start(): Promise<void>;

  /**
   * Requests graceful shutdown of the delivery worker.
   *
   * The worker stops claiming new batches and allows active delivery
   * operations to finish within the configured shutdown deadline.
   * Confirmed successful writes are acknowledged. Unresolved writes
   * must not be acknowledged merely because shutdown timed out.
   *
   * An unresolved write must not be released for concurrent redelivery
   * while the original write may still commit, unless the implementation
   * can safely coordinate that uncertainty.
   *
   * @returns A promise that resolves when shutdown has completed
   * or the configured shutdown deadline has been reached.
   */
  stop(): Promise<void>;
}