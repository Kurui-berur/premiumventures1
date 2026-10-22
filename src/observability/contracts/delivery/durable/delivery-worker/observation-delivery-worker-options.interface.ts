/**
 * Defines the configuration used by an observation delivery worker.
 */
export interface ObservationDeliveryWorkerOptions {
  /**
   * Maximum number of observations claimed for one delivery batch.
   *
   * Must be a positive safe integer.
   */
  readonly batchSize: number;

  /**
   * Maximum number of delivery batches that may be processed
   * concurrently.
   *
   * Must be a positive safe integer.
   */
  readonly maxConcurrentBatches: number;

  /**
   * Maximum time, in milliseconds, that graceful shutdown may wait
   * for active delivery work before the worker stops waiting.
   *
   * Must be a non-negative safe integer.
   */
  readonly shutdownTimeoutMs: number;
}