import { Observation } from "../../observation/observation.interface";

/**
 * Represents a consumer that receives live observations.
 *
 * A listener may handle an observation synchronously or return a
 * promise for asynchronous work.
 */
export type LiveObservationListener = (
  observation: Observation
) => void | Promise<void>;

/**
 * Defines the contract for subscribing to live observations.
 *
 * Consumers depend on this interface rather than a concrete broadcaster.
 * Observations are delivered to subscribers while they remain subscribed.
 *
 * This contract does not guarantee replay of observations missed while
 * a consumer was disconnected or not yet subscribed.
 */
export interface LiveObservationSource {
  /**
   * Registers a listener to receive live observations.
   *
   * @param listener - The callback invoked when an observation is
   * delivered to the subscriber.
   *
   * @returns An unsubscribe function that stops future delivery to
   * this listener. Calling the function more than once is safe.
   */
  subscribe(
    listener: LiveObservationListener,
  ): () => void;
}
