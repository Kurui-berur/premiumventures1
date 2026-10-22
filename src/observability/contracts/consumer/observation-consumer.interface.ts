import { Observation } from "../observation/observation.interface";

/**
 * Receives observations as an independent consumer of the
 * observability subsystem.
 *
 * A consumer is intentionally unaware of the producer, holding
 * mechanism, delivery infrastructure, and other consumers.
 */
export interface ObservationConsumer {
  /**
   * Consumes an observation.
   *
   * The consumer determines what the observation means for its
   * own purpose, such as testing, debugging, or telemetry.
   *
   * @param observation - The observation being consumed.
   */
  consume(observation: Observation): void;
}