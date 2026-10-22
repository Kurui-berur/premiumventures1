
import type { Observation } from
  '../observation/observation.interface';

/**
 * Defines an independent destination for observations.
 *
 * A delivery path represents one observability concern and determines
 * its own acceptance, delivery, and persistence semantics.
 *
 * Delivery paths operate downstream of the asynchronous observation
 * boundary and must not introduce blocking dependencies into engine
 * execution.
 */
export interface ObservationDeliveryPath {
  /**
   * Accepts an observation for this delivery path.
   *
   * The promise resolves when the path has accepted responsibility
   * for the observation according to its documented acceptance
   * guarantee.
   *
   * Resolution does not necessarily mean that a remote subscriber
   * received the observation or that a downstream consumer processed it.
   *
   * The promise rejects if the path cannot satisfy its acceptance
   * contract. Callers are responsible for handling failures without
   * coupling independent delivery paths.
   *
   * @param observation - The observation to deliver.
   * @returns A promise representing acceptance by this delivery path.
   */
  accept(observation: Observation): Promise<void>;
}
