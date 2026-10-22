
import { Observation } from '../observation/observation.interface';

/**
 * Represents an observation registered in a buffer and claimed for
 * downstream publication.
 *
 * The buffer identifier tracks the observation's lifecycle within the
 * buffer, while the observation identifier identifies the occurrence
 * represented by the observation itself.
 *
 * These identifiers serve different purposes and must not be treated
 * as interchangeable.
 *
 * This interface contains the observation and its buffer-specific identity.
 * It does not represent confirmation that publication or consumer
 * processing has succeeded.
 */
export interface BufferedObservation {
  /**
   * Identifies this observation's entry within the buffer.
   *
   * This identifier is used by buffer lifecycle operations such as
   * acknowledgement and release.
   */
  readonly bufferId: string;

  /**
   * The original observation registered in the buffer.
   *
   * The buffer carries the observation without changing its occurrence
   * type, context, ordering information, causal relationships, or payload.
   */
  readonly observation: Observation;
}