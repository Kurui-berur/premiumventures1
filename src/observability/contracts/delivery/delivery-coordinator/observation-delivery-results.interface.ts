
export type ObservationDeliveryOutcome =
  | {
      readonly status: "ACCEPTED";
    }
  | {
      readonly status: "FAILED";
      readonly error: unknown;
    };

/**
 * Represents the independent outcomes of delivering one observation
 * to the configured observability paths.
 *
 * Each path's outcome is recorded separately so that failure in one
 * path does not conceal success or failure in another.
 */
export interface ObservationDeliveryResult {
  /**
   * Outcome of best-effort live delivery.
   *
   * Undefined when live delivery is disabled.
   */
  readonly live?: ObservationDeliveryOutcome;

  /**
   * Outcome of durable delivery.
   *
   * Undefined when durable delivery is disabled.
   */
  readonly durable?: ObservationDeliveryOutcome;
}
