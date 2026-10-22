
/**
 * Configures optional live delivery independently of durable delivery.
 *
 * Durable delivery remains required because it is the authoritative
 * path for preserving observations for testing and later inspection.
 *
 * Live delivery may be disabled when real-time updates are not needed.
 */
export interface ObservationDeliveryOptions {
  /**
   * Whether observations should also be sent through the live path.
   *
   * When false, the coordinator skips live delivery without affecting
   * durable delivery.
   */
  readonly liveEnabled: boolean;
}
