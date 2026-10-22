import type { ObservationContext } from "src/observability/contracts/context/observationContext.interface";
import { ExecutionObservation } from "../contracts/observability/execution-observation.interface";
import type { ObservationFactory } from "src/observability/contracts/factories/observation-factory.interface";
import type { ObservationSink } from "src/observability/contracts/sink/observation-sink.interface";
import { ObservationInput } from "src/observability/contracts/observation/observation-input.interface";
import { ObservationReference } from "src/observability/contracts/observation/observation-reference.interface";
import { Inject } from "@nestjs/common";
import { OBSERVATION_CONTEXT } from "src/observability/tokens/context/observability-context.token";
import { OBSERVATION_FACTORY } from "src/observability/tokens/factories/observability-factories.tokens";
import { OBSERVATION_SINK } from "src/observability/tokens/sink/observability-sink.tokens";

/**
 * Provides the observation capability for a single execution.
 *
 * ExecutionObservability is the execution-side boundary between
 * the execution component and the independent observability
 * infrastructure.
 *
 * Its responsibility is to:
 *
 * - maintain the observation context for the execution;
 * - assign sequence numbers within the execution's observation stream;
 * - accept explicit causal relationships between observations;
 * - create observations through the ObservationFactory; and
 * - publish created observations through the ObservationSink.
 *
 * ExecutionObservability does not:
 *
 * - deliver observations to consumers;
 * - persist observations;
 * - manage observation consumers;
 * - evaluate delivery policies;
 * - monitor consumer performance; or
 * - wait for downstream observation processing.
 *
 * The execution component therefore only reports significant
 * occurrences. The subsequent delivery, persistence, and
 * consumption of those observations remain outside the execution
 * component's critical execution path.
 */
export class ExecutionObservability implements ExecutionObservation {

    /**
     * The sequence number assigned to the next observation.
     *
     * Sequence numbers establish ordering within the observation
     * stream represented by the associated ObservationContext.
     *
     * Sequence numbers are local to this execution observation
     * capability and do not establish a global ordering across
     * independent observation streams.
     */
    private sequence: number = 0;

    /**
     * Creates an execution-specific observability capability.
     *
     * @param context
     * Defines the logical scope and observation stream to which
     * observations produced by this instance belong.
     *
     * @param observation
     * Creates immutable Observation instances from the occurrence
     * information supplied by the execution component.
     *
     * @param sink
     * Defines the boundary through which created observations leave
     * the execution component and enter the independent observation
     * infrastructure.
     *
     * The sink must provide a non-blocking publication boundary.
     * Execution must not wait for observation consumers,
     * persistence, or downstream processing.
     */
constructor(
  @Inject(OBSERVATION_CONTEXT)
  private readonly context: ObservationContext,

  @Inject(OBSERVATION_FACTORY)
  private readonly observation: ObservationFactory,

  @Inject(OBSERVATION_SINK)
  private readonly sink: ObservationSink,
) {}

    /**
     * Reports a significant occurrence within the execution.
     *
     * The method assigns the next sequence number, combines the
     * occurrence information with the execution's observation
     * context, and delegates observation creation to the
     * ObservationFactory.
     *
     * When causal relationships are known, the references supplied
     * through `causedBy` are converted into observation identifiers
     * and preserved on the resulting observation.
     *
     * After the observation is created, it is handed to the
     * ObservationSink. The method does not wait for downstream
     * delivery, persistence, or consumer processing.
     *
     * A lightweight ObservationReference is returned so that a
     * later observation can explicitly identify this observation
     * as a causal predecessor.
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
     * @returns A lightweight reference to the newly created
     * observation.
     *
     * @example
     *
     * ```ts
     * const answer =
     *     context.observation.observe(
     *         'answer.submitted',
     *         {
     *             answerId: answer.id
     *         }
     *     );
     *
     * context.observation.observe(
     *     'decision.evaluated',
     *     {
     *         decisionId: decision.id
     *     },
     *     [answer]
     * );
     * ```
     */
    observe<TPayload>(
        type: string,
        payload: TPayload,
        causedBy?: readonly ObservationReference[]
    ): ObservationReference {

        const sequence = this.sequence++;

        const observationInput: ObservationInput = {
            type,
            context: this.context,
            sequence,
            causedBy: causedBy?.map(
                reference => reference.observationId
            ),
            payload
        };

        const observation =
            this.observation.create(observationInput);

        this.sink.publish(observation);

        const reference: ObservationReference = {
            observationId: observation.id
        };

        return reference;
    }
}