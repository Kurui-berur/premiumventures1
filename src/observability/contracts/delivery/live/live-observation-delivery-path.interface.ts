import { Observation } from "../../observation/observation.interface";
import { ObservationDeliveryPath } from "../observation-delivery-path.interface";

/**
 * Defines an independent destination for live observation delivery.
 *
 * A live delivery path makes observations available to a live-delivery
 * mechanism as they occur, rather than waiting for batch publication.
 *
 * It inherits the general observation acceptance contract while defining
 * the specific expectations of live delivery.
 *
 * The live path is downstream of the asynchronous observation boundary
 * and must not introduce blocking dependencies into engine execution.
 *
 * This interface does not prescribe a particular transport, such as
 * WebSockets, Server-Sent Events, or an in-process event dispatcher.
 *
 * Acceptance by this path does not guarantee that every subscriber has
 * received or processed the observation. Subscriber delivery guarantees
 * are determined by the concrete implementation.
 */
export interface LiveObservationDeliveryPath
  extends ObservationDeliveryPath {

  /**
   * Accepts an observation for live delivery.
   *
   * The implementation should make the observation available to its
   * live-delivery mechanism without waiting for batch publication.
   *
   * The promise resolves when the live-delivery mechanism accepts
   * responsibility for the observation.
   *
   * It rejects if the implementation cannot satisfy its acceptance
   * contract. The caller must handle rejection without allowing failures
   * in this live path to block independent delivery paths.
   *
   * Resolving this promise does not guarantee delivery to every subscriber.
   *
   * @param observation - The observation to deliver live.
   * @returns A promise representing acceptance by the live-delivery path.
   */
  accept(observation: Observation): Promise<void>;
}
