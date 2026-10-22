import { Observation } from "../observation/observation.interface";

/**
 * Defines the asynchronous handoff boundary between observation
 * production and downstream observability processing.
 *
 * A handoff accepts an observation and returns control without
 * waiting for downstream holding or delivery to complete.
 *
 * This boundary protects the producer's critical execution path
 * from downstream observability work.
 */
export interface ObservationHandoff {
  /**
   * Hands an observation off for asynchronous downstream processing.
   *
   * @param observation - The observation to hand off.
   */
  handoff(observation: Observation): void;
}