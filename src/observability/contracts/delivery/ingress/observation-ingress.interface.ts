
import { Observation } from "../../observation/observation.interface";

/**
 * Defines the internal acceptance boundary for observations entering
 * the in-memory observability delivery pipeline.
 *
 * Ingress coordinates buffer acceptance and notification of the
 * delivery worker.
 *
 * Comprehensive observation validation is delegated to the downstream
 * delivery pipeline. Ingress must not perform comprehensive payload
 * validation or durable persistence.
 *
 * Ingress must not wait for delivery to complete.
 */
export interface ObservationIngress {
  /**
   * Accepts an observation into the in-memory delivery pipeline.
   *
   * The implementation delegates entry management to the buffer
   * and signals the delivery worker when work may be available.
   *
   * Ingress does not perform comprehensive observation validation.
   * Invalid observations may therefore be accepted into the buffer
   * and subsequently rejected by the downstream delivery pipeline.
   *
   * An identical observation that is already active may reuse its
   * existing buffer entry. Reusing an active observation ID for
   * different logical content must be rejected as an identity conflict.
   *
   * If buffer acceptance succeeds but worker notification fails,
   * the accepted entry must remain in the buffer. The implementation
   * must not roll back acceptance solely because notification failed.
   *
   * @param observation - The observation submitted for acceptance.
   * @returns The buffer ID identifying the accepted or reused entry.
   * @throws An identity conflict error if an active observation ID
   * is associated with different logical content.
   * @throws An internal acceptance error if buffer acceptance fails.
   */
  accept(observation: Observation): string;
}
