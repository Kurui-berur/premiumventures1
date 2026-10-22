import { ObservationContext } from "../context/observationContext.interface";


/**
 * Defines the information required to create an observation.
 *
 * ObservationInput contains the occurrence information supplied
 * by the observation producer before it is converted into the
 * immutable Observation model.
 *
 * The input contains both the observation context and the
 * ordering/causal information established by the producer.
 *
 * @typeParam TPayload
 * Type of the occurrence-specific payload.
 */
export interface ObservationInput<TPayload = unknown> {
  /**
   * Identifies the significant occurrence being observed.
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
   * Defines the contextual scope in which the occurrence happened.
   *
   * The context identifies the logical scope and ordered stream
   * to which the observation belongs.
   */
  readonly context: ObservationContext;

  /**
   * Identifies the position of the observation within its
   * observation stream.
   *
   * Sequence establishes ordering within the stream and does not
   * imply a global ordering across independent streams.
   */
  readonly sequence: number;

  /**
   * Identifies observations that causally contributed to this
   * occurrence.
   *
   * Causality is established by the producer when the relationship
   * is known. The observation infrastructure must not infer causal
   * relationships from sequence alone.
   */
  readonly causedBy?: readonly string[];

  /**
   * Contains information specific to the observed occurrence.
   *
   * The payload is defined by the producing subsystem and is not
   * interpreted by the generic observation infrastructure.
   */
  readonly payload: TPayload;
}