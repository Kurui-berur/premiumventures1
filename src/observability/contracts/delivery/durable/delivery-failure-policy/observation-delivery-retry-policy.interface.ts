import { ObservationDeliveryFailure } from "../delivery-failure/observation-delivery-failure.interface";

/**
 * Represents the action to take after an observation delivery attempt fails.
 *
 * A retry decision specifies how long the worker should wait before
 * attempting to deliver the batch again.
 *
 * A quarantine decision indicates that the batch should be transferred
 * to the quarantine mechanism rather than retried unchanged.
 */
export type ObservationDeliveryDecision =
  | {
      /**
       * Indicates that the batch should be attempted again.
       */
      readonly action: "RETRY";

      /**
       * Minimum delay, in milliseconds, before the next attempt.
       */
      readonly delayMs: number;
    }
  | {
      /**
       * Indicates that the batch should be moved to quarantine.
       */
      readonly action: "QUARANTINE";
    };

/**
 * Defines the policy for deciding how failed observation deliveries
 * should be handled.
 *
 * The policy evaluates failure information and returns a decision.
 * It does not perform persistence, schedule timers, retry writes,
 * report failures, or quarantine observations.
 */
export interface ObservationDeliveryRetryPolicy {
  /**
   * Determines the next action for a failed delivery attempt.
   *
   * Transient failures may be retried with backoff and jitter.
   * Identity and stream-position conflicts should be quarantined
   * because retrying unchanged data cannot resolve those conflicts.
   * Unknown failures may be retried a bounded number of times before
   * being quarantined.
   *
   * @param failure - Details of the failed delivery attempt.
   * @returns The retry or quarantine decision.
   */
  decide(
    failure: ObservationDeliveryFailure,
  ): ObservationDeliveryDecision;
}