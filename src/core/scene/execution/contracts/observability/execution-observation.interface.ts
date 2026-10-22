import { ObservationReference } from "src/observability/contracts/observation/observation-reference.interface";

/**
 * Provides the observation capability available to an execution.
 *
 * Execution components use this interface to report significant
 * occurrences without depending on the underlying observation
 * infrastructure.
 *
 * The execution observation capability accepts an occurrence,
 * establishes the information required to represent it, and hands
 * it to the observation infrastructure without waiting for
 * downstream observation delivery or consumption.
 *
 * Execution components therefore remain independent of:
 *
 * - observation consumers;
 * - delivery paths;
 * - persistence;
 * - delivery policies; and
 * - downstream processing time.
 *
 * The producer is responsible for identifying significant
 * occurrences and, when known, establishing their causal
 * relationships.
 */
export interface ExecutionObservation {

  /**
   * Reports a significant occurrence within the execution.
   *
   * The occurrence is identified by its type and occurrence-specific
   * payload. When the occurrence is causally related to previously
   * observed occurrences, their references may be supplied through
   * `causedBy`.
   *
   * The method returns a lightweight reference to the newly
   * created observation. This reference can subsequently be used
   * to establish a causal relationship with another observation.
   *
   * The method does not wait for observation delivery, persistence,
   * or consumer processing. Observation delivery therefore remains
   * outside the execution component's critical path.
   *
   * @typeParam TPayload
   * Type of the occurrence-specific payload.
   *
   * @param type
   * Identifies the significant occurrence being observed.
   *
   * @param payload
   * Contains information specific to the occurrence.
   *
   * @param causedBy
   * Optionally identifies observations that causally contributed
   * to the occurrence being reported.
   *
   * @returns A reference identifying the newly created observation.
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
  observe<TPayload>(
    type: string,
    payload: TPayload,
    causedBy?: readonly ObservationReference[],
  ): ObservationReference;
}