import { Observation } from "../../observation/observation.interface";

/**
 * Defines the contract for broadcasting observations to live subscribers.
 *
 * This abstraction separates live observation delivery from the
 * underlying transport mechanism.
 *
 * Implementations may use an in-process event dispatcher, WebSockets,
 * Server-Sent Events, or another live-delivery mechanism.
 *
 * The broadcaster operates downstream of the asynchronous observation
 * boundary and must not introduce blocking dependencies into execution.
 */
export interface LiveObservationBroadcaster {
  /**
   * Makes an observation available to the live-delivery mechanism.
   *
   * The promise resolves when the broadcasting mechanism has accepted
   * responsibility for the observation.
   *
   * Resolution does not guarantee that every connected subscriber
   * received or processed the observation.
   *
   * The implementation defines how observations are distributed to
   * currently subscribed consumers and how transport failures are handled.
   *
   * @param observation - The observation to broadcast.
   * @returns A promise representing acceptance by the broadcasting mechanism.
   */
  broadcast(observation: Observation): Promise<void>;
}
