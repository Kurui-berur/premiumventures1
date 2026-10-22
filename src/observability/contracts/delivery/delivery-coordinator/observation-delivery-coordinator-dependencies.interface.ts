import { ObservationDeliveryPath } from "../observation-delivery-path.interface";
import { ObservationDeliveryOptions } from "./observation-delivery-options.interface";

/**
 * Groups the dependencies required to coordinate observation delivery.
 *
 * The durable path is required. The live path is supplied as a
 * dependency but is only used when live delivery is enabled.
 */
export interface ObservationDeliveryCoordinatorDependencies {
  /**
   * The authoritative path for durable observation delivery.
   */
  readonly durablePath: ObservationDeliveryPath;

  /**
   * The best-effort path for live observation delivery.
   */
  readonly livePath: ObservationDeliveryPath;

  /**
   * Controls optional live delivery.
   */
  readonly options: ObservationDeliveryOptions;
}
