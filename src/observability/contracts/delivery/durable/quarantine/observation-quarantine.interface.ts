import { Observation } from "src/observability/contracts/observation/observation.interface";
import { ObservationDeliveryFailure } from "../delivery-failure/observation-delivery-failure.interface";

/**
 * Represents a batch of observations transferred to quarantine
 * after normal delivery has been abandoned.
 *
 * The batch retains its original observations and failure details
 * so that the observations can be inspected and potentially
 * recovered later.
 */
export interface QuarantinedBatch {
  /**
   * Stable identifier for this logical batch.
   *
   * The same identifier must be reused if quarantine acceptance
   * is retried after an uncertain outcome.
   */
  readonly batchId: string;

  /**
   * The original observations that could not be delivered normally.
   *
   * Their identities and logical contents must remain unchanged.
   */
  readonly observations: readonly Observation[];

  /**
   * Details of the delivery failure that caused quarantine.
   */
  readonly failure: ObservationDeliveryFailure;

  /**
   * Time at which quarantine acceptance was attempted,
   * represented as Unix epoch milliseconds.
   */
  readonly quarantinedAt: number;
}

/**
 * Defines the contract for durably retaining batches that cannot
 * continue through normal observation delivery.
 *
 * Implementations must support idempotent acceptance so that
 * retries do not create duplicate quarantine records.
 */
export interface ObservationQuarantine {
  /**
   * Durably accepts a batch into quarantine.
   *
   * The promise resolves only after the quarantine implementation
   * has durably retained the batch, or confirmed that an identical
   * batch with the same batch ID was already retained.
   *
   * Reusing a batch ID for different logical quarantine content
   * must be rejected as a conflict.
   *
   * If the promise rejects, the worker must not assume that
   * quarantine acceptance definitely failed; the outcome may be
   * uncertain. Retrying must therefore be safe.
   *
   * @param batch - The failed batch and its failure details.
   * @returns A promise that resolves after durable acceptance.
   */
  quarantine(batch: QuarantinedBatch): Promise<void>;
}