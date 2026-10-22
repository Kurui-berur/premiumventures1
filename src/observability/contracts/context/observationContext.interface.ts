/**
 * Defines the contextual scope in which an observation occurs.
 *
 * An observation context identifies where an observation belongs,
 * the ordered stream to which it belongs, and optionally the
 * larger scope within which that activity is occurring.
 *
 * The context is intentionally independent of any specific engine
 * component such as Execution, Decision Engine, or Projection.
 */
export interface ObservationContext {
  /**
   * Identifies the logical scope in which the observation occurred.
   *
   * The scope represents the activity or component context to which
   * the observation belongs. Its meaning is defined by the producer,
   * not by the observability infrastructure.
   */
  readonly scopeId: string;

  /**
   * Identifies the ordered observation stream within the scope.
   *
   * Observations belonging to the same stream share an ordering
   * boundary. Ordering is therefore established within a stream
   * rather than imposed globally across all observations.
   */
  readonly streamId: string;

  /**
   * Optionally identifies the larger scope containing this scope.
   *
   * This allows related activities to be represented hierarchically,
   * such as a decision or projection activity occurring within an
   * execution scope.
   *
   * The observability infrastructure does not infer this relationship;
   * the producer establishes it when the relationship is meaningful.
   */
  readonly parentScopeId?: string;
}