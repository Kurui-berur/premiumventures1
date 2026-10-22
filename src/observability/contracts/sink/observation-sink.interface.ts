import type { Observation } from "../observation/observation.interface";

/**
 * Defines the boundary through which execution exposes an observation
 * to the observability subsystem.
 *
 * The producer uses this interface to hand an already-created
 * observation to observability without depending on downstream
 * consumers, persistence, or delivery infrastructure.
 *
 * Implementations must isolate observability failures so that they
 * cannot propagate back to the execution producer.
 */
export interface ObservationSink {
  /**
   * Submits an observation for best-effort observability processing.
   *
   * The operation represents a handoff attempt from execution
   * to observability. It does not guarantee buffer acceptance,
   * durable persistence, or delivery to consumers.
   *
   * Implementations must not throw observability-related errors
   * back to the producer and must not wait for durable persistence.
   * They should perform minimal synchronous work to avoid materially
   * delaying execution.
   *
   * @param observation - The occurrence to make available to observability.
   */
  publish(observation: Observation): void;
}