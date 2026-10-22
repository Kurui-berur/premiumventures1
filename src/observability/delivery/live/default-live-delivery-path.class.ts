import { LiveObservationBroadcaster } from "src/observability/contracts/delivery/live/live-observation-broadcaster.interface";
import { LiveObservationDeliveryPath } from "src/observability/contracts/delivery/live/live-observation-delivery-path.interface";
import { Observation } from "src/observability/contracts/observation/observation.interface";


/**
 * Implements the live observation delivery path.
 *
 * Delegates observation distribution to a LiveObservationBroadcaster
 * without depending on a specific transport or subscriber.
 *
 * The path does not retain observations, retry failures, or wait for
 * subscribers to finish processing an observation.
 */
export class DefaultLiveObservationDeliveryPath
  implements LiveObservationDeliveryPath {

  constructor(
    private readonly broadcaster: LiveObservationBroadcaster,
  ) {}

  /**
   * Accepts an observation for live distribution.
   *
   * Resolves when the broadcaster accepts the observation for
   * distribution. Rejects if the broadcaster cannot accept it.
   *
   * @param observation - The observation to deliver.
   * @returns A promise representing the broadcaster's acceptance.
   */
  accept(observation: Observation): Promise<void> {
    return this.broadcaster.broadcast(observation);
  }
}
