import { Observation } from "../../observation/observation.interface";
import { ObservationDeliveryResult } from "./observation-delivery-results.interface";

/**
 * Coordinates independent delivery of observations to configured
 * observability destinations.
 *
 * The coordinator dispatches observations to enabled delivery paths
 * and records each path's outcome independently.
 *
 * Failure in one path must not prevent another enabled path from
 * being attempted.
 *
 * The coordinator does not own buffer lifecycle, retry policies,
 * quarantine, or durable acknowledgement.
 */
export interface ObservationDeliveryCoordinator {
  /**
   * Dispatches an observation to the enabled delivery paths.
   *
   * Each enabled path is attempted independently. A path failure
   * must be represented in that path's outcome rather than preventing
   * another enabled path from being attempted.
   *
   * The returned result describes path acceptance, not completion
   * of downstream consumer processing.
   *
   * @param observation - The observation to dispatch.
   * @returns The independent outcomes of the enabled delivery paths.
   */
  dispatch(
    observation: Observation,
  ): Promise<ObservationDeliveryResult>;
}
