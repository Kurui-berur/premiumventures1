
import { Observation } from '../observation/observation.interface';
import { BufferedObservation } from './buffered-observation.interface';
import { ObservationBufferStats } from './observation-buffer-stats.interface';

/**
 * Defines the contract for buffering observations awaiting publication.
 *
 * The buffer separates observation acceptance from downstream publishing.
 * It temporarily holds observations and tracks their lifecycle while a
 * publisher transfers them to a downstream delivery mechanism.
 *
 * An observation moves through the following lifecycle:
 *
 * - Pending: accepted by the buffer and available for publication.
 * - In-flight: claimed by a publisher for a publication attempt.
 * - Acknowledged: successfully handed off to the downstream queue.
 *
 * An in-flight observation may be released back to the pending state when
 * its publication attempt fails.
 *
 * The buffer is responsible for:
 *
 * - accepting and registering observations;
 * - assigning buffer-specific identifiers;
 * - providing batches of pending observations;
 * - tracking in-flight observations;
 * - acknowledging successful publication handoffs;
 * - releasing failed publication attempts for retry; and
 * - reporting buffer workload and lifecycle statistics.
 *
 * The buffer does not publish observations, manage consumers, or determine
 * what an observation means. It is independent of any specific queue,
 * persistence technology, or application framework.
 *
 * Implementations must define their behavior for invalid batch limits,
 * unknown identifiers, repeated acknowledgements, and repeated releases.
 *
 * Acknowledgement confirms acceptance by the downstream delivery mechanism.
 * It does not imply that the observation has been processed by a consumer.
 *
 * Unless an implementation explicitly provides durable storage, buffering
 * an observation does not guarantee its survival across process failure.
 */
export interface ObservationBuffer {
  /**
   * Accepts an observation into the buffer.
   *
   * The buffer registers the observation as pending and returns an identifier
   * that can be used to track its lifecycle within the buffer.
   *
   * The returned identifier is distinct from the observation's own ID.
   *
   * @typeParam TPayload - The type of the observation's occurrence-specific payload.
   * @param observation - The observation to buffer.
   * @returns The identifier assigned to this buffered observation.
   */
  receive(observation: Observation): string;

  /**
   * Claims a batch of pending observations for publication.
   *
   * Claimed observations transition from pending to in-flight and are no
   * longer available to another batch request while they remain in-flight.
   *
   * The returned batch contains no more than the requested limit. If fewer
   * observations are pending, the batch contains only those available.
   *
   * @param limit - Maximum number of observations to claim.
   * @returns The claimed observations, each with its buffer identifier.
   */
  takeBatch(limit: number): BufferedObservation[];

  /**
   * Acknowledges observations whose downstream publication handoff succeeded.
   *
   * Acknowledged observations are removed from the buffer's active workload.
   * Implementations should define repeated and unknown identifier handling
   * so that acknowledgements can be applied predictably.
   *
   * Acknowledgement does not confirm downstream consumer processing.
   *
   * @param ids - Buffer identifiers of observations to acknowledge.
   */
  acknowledge(ids: readonly string[]): void;

  /**
   * Releases in-flight observations whose publication attempt did not succeed.
   *
   * Released observations return to the pending state and become eligible
   * for another publication attempt.
   *
   * Implementations should preserve the intended ordering behavior when
   * released observations are made available for retry.
   *
   * @param ids - Buffer identifiers of observations to release.
   */
  release(ids: readonly string[]): void;

  /**
   * Returns a snapshot of the buffer's workload and lifecycle counters.
   *
   * The snapshot reports how many observations have been received, how many
   * are currently pending or in-flight, and the cumulative acknowledgement
   * and release counts.
   *
   * The returned statistics describe buffer activity; they do not establish
   * whether downstream consumers have processed the observations.
   *
   * @returns The current buffer statistics.
   */
  getStats(): ObservationBufferStats;
}