// holding/observation-holding.ts

import { Observation } from "../observation/observation.interface";


export interface ObservationHolding {
  hold(observation: Observation): void;
}/**
 * Keeps asynchronously handed-off observations available downstream.
 *
 * Holding exists because observation production and observation
 * consumption are asynchronous and may occur at different times.
 *
 * Holding is responsible for retaining observations; it does not
 * determine execution semantics or manage consumers.
 */
export interface ObservationHolding {
  /**
   * Keeps an observation available for downstream processing.
   *
   * @param observation - The observation to hold.
   */
  hold(observation: Observation): void;
}