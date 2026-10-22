import { ObservationContext } from "../context/observationContext.interface";
/**
 * Represents a primitive value supported by JSON.
 *
 * These values can be serialized to JSON without requiring
 * a custom serialization strategy.
 */
export type JsonPrimitive =
  | string
  | number
  | boolean
  | null;

/**
 * Represents a value that can be expressed using JSON data structures.
 *
 * A JSON value may be a primitive, an array of JSON values,
 * or an object whose properties contain JSON values.
 *
 * This type describes the permitted data shape at compile time.
 * Runtime validation is still required to reject unsupported values,
 * including non-finite numbers, circular references, and values
 * that TypeScript's structural types cannot exclude.
 */
export type JsonValue =
  | JsonPrimitive
  | readonly JsonValue[]
  | { readonly [key: string]: JsonValue };
/**
 * Represents a significant occurrence made observable within
 * an observability scope.
 *
 * An Observation is the immutable representation of something
 * meaningful that occurred during execution or another observed
 * activity.
 *
 * The observation contains:
 *
 * - its unique identity;
 * - the type of occurrence;
 * - when the occurrence was recorded;
 * - the contextual scope in which it occurred;
 * - its position within the observation stream;
 * - explicit causal relationships to preceding observations; and
 * - occurrence-specific payload data.
 *
 * The observation producer establishes the context, ordering,
 * and causal relationships. The generic observability
 * infrastructure preserves and transports those facts without
 * inferring their meaning.
 *
 * @typeParam TPayload
 * Type of the occurrence-specific payload.
 */
export interface Observation<TPayload extends JsonValue=JsonValue> {

  /**
   * Uniquely identifies this observation.
   *
   * The identifier allows another observation to reference this
   * observation as a causal predecessor.
   */
  readonly id: string;

  /**
   * Identifies the type of significant occurrence being observed.
   *
   * The meaning of the type is defined by the producing subsystem.
   *
   * Examples:
   *
   * - `execution.started`
   * - `answer.submitted`
   * - `decision.evaluated`
   * - `transition.selected`
   * - `scene.entered`
   */
  readonly type: string;

  /**
   * Identifies when the observation was created.
   *
   * The timestamp represents observation creation time and is
   * independent of the sequence number used to establish ordering
   * within an observation stream.
   */
  readonly timestamp: number;

  /**
   * Defines the contextual scope in which the occurrence happened.
   *
   * The context identifies where the observation belongs and which
   * ordered observation stream it is associated with.
   */
  readonly context: ObservationContext;

  /**
   * Identifies the position of this observation within its
   * observation stream.
   *
   * Sequence ordering is scoped to the stream identified by
   * `context.streamId`. It does not establish a global ordering
   * across independent observation streams.
   */
  readonly sequence: number;

  /**
   * Identifies observations that causally contributed to this
   * occurrence.
   *
   * Causality is explicitly established by the producer when the
   * relationship is known. The observability infrastructure must
   * not infer causality from sequence or temporal proximity.
   */
  readonly causedBy?: readonly string[];

  /**
   * Contains information specific to the observed occurrence.
   *
   * The generic observability infrastructure does not interpret
   * the payload. Its meaning is defined by the subsystem that
   * produced the observation.
   */
  readonly payload: TPayload;
}