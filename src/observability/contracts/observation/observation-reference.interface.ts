/**
 * Identifies an observation that can be referenced by another
 * observation as a causal predecessor.
 *
 * An observation reference intentionally exposes only the identity
 * of the referenced observation. It does not expose the observation
 * payload, context, delivery mechanism, or any other observation
 * infrastructure.
 *
 * Producers can use the reference to establish an explicit causal
 * relationship when creating a subsequent observation.
 *
 * @example
 *
 * ```ts
 * const answerObservation =
 *   context.observation.observe(
 *     'answer.submitted',
 *     {
 *       answerId: answer.id,
 *     },
 *   );
 *
 * context.observation.observe(
 *   'decision.evaluated',
 *   {
 *     decisionId: decision.id,
 *   },
 *   [answerObservation],
 * );
 * ```
 */
export interface ObservationReference {
  /**
   * Identifies the observation being referenced.
   *
   * The identifier is used to establish a causal relationship
   * between observations without exposing the referenced
   * observation itself.
   */
  readonly observationId: string;
}