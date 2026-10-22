import { ObservationDeliveryFailure } from "../delivery-failure/observation-delivery-failure.interface";

/**
 * Defines the boundary for reporting failures encountered while
 * delivering observations to durable storage.
 *
 * Failure reporting is diagnostic work. A reporting failure must not
 * interrupt the execution producer or prevent the delivery worker
 * from applying its retry or quarantine policy.
 */
export interface ObservationDeliveryFailureReporter {
  /**
   * Reports a failed observation delivery attempt.
   *
   * The promise resolves when the configured reporting mechanism
   * has accepted the failure according to its own durability contract.
   *
   * The promise rejects if reporting fails. Callers must handle that
   * rejection without allowing it to crash the worker or abandon
   * the original failed batch.
   *
   * The same failure may be reported more than once when delivery
   * attempts or reporting operations are retried.
   *
   * @param failure - Details of the failed delivery attempt.
   * @returns A promise that resolves when reporting has succeeded.
   */
  report(failure: ObservationDeliveryFailure): Promise<void>;
}