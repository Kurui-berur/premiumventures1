import { Observation } from "../../observation/observation.interface";

/**
 * Defines the acceptance boundary for observations entering the
 * in-memory delivery pipeline.
 *
 * Ingress coordinates observation validation, buffer acceptance,
 * active duplicate handling, and notification that delivery work
 * may be available.
 *
 * Successful acceptance means that the observation has been accepted
 * into the in-memory buffer. It does not mean that the observation
 * has been durably persisted.
 */
export interface ObservationIngress {
  /**
   * Validates and accepts an observation into the delivery pipeline.
   *
   * The implementation validates the observation before buffering it.
   * It then accepts the observation into the buffer and notifies the
   * delivery worker that work may be available.
   *
   * Repeated submissions of an identical observation may reuse the
   * existing active buffer entry. Reusing an observation ID for
   * different logical content must raise an identity conflict.
   *
   * If validation fails, the observation must not enter the buffer.
   *
   * @param observation - The observation submitted by a producer.
   * @returns The buffer ID identifying the accepted active entry.
   * @throws An observation validation error if the observation is invalid.
   * @throws ObservationIdentityConflictError if an active observation
   * with the same ID has different logical content.
   */
  accept(observation: Observation): string;
}