/**
 * Classifies the cause of an observation delivery failure.
 *
 * The category helps the retry policy determine whether a failed
 * batch should be retried or moved to quarantine.
 */
export type ObservationDeliveryFailureCategory =
  | "VALIDATION"
  | "TRANSIENT"
  | "IDENTITY_CONFLICT"
  | "STREAM_POSITION_CONFLICT"
  | "UNKNOWN";

/**
 * Describes a failed attempt to durably deliver a batch of observations.
 *
 * This record captures the affected batch, the observations involved,
 * the failure classification, and diagnostic information.
 *
 * It describes a delivery failure; it does not itself perform retries,
 * persist the failure, or move observations into quarantine.
 */
export interface ObservationDeliveryFailure {
  /**
   * Stable identifier for the logical batch being delivered.
   *
   * The identifier must remain the same when the same batch is retried
   * or moved to quarantine.
   */
  readonly batchId: string;

  /**
   * Identifiers of the observations involved in the failed batch.
   */
  readonly observationIds: readonly string[];

  /**
   * Classification of the failure.
   *
   * This classification informs retry decisions but does not replace
   * the underlying error details.
   */
  readonly category: ObservationDeliveryFailureCategory;

  /**
   * Time at which this failure was recorded, in Unix epoch milliseconds.
   */
  readonly occurredAt: number;

  /**
   * Number of the delivery attempt that failed, starting at 1.
   */
  readonly attempt: number;

  /**
   * Name of the underlying error type, when available.
   */
  readonly errorName: string;

  /**
   * Human-readable description of the failure.
   *
   * This is diagnostic information and must not be treated as a
   * machine-readable decision signal.
   */
  readonly errorMessage: string;
}