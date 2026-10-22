import { EventEnvelope } from './event-envelope.interface';

/**
 * Consumes an event delivered by the Event System.
 *
 * The handler is responsible for processing the event within
 * its own boundary. The Event System is not responsible for
 * interpreting the event or deciding what action should follow.
 *
 * A handler may:
 *
 * - create an execution request;
 * - update a domain model;
 * - publish another event;
 * - record an observation.
 *
 * Processing semantics:
 *
 * - resolved Promise → processing succeeded;
 * - rejected Promise → processing failed.
 *
 * Example:
 *
 *     answer.submitted
 *            │
 *            ▼
 *     EventBus
 *            │
 *            ▼
 *     AnswerSubmittedHandler
 *            │
 *            ▼
 *     ExecutionRequest
 *
 * The handler does not receive a FlowContext automatically.
 * If flow association is required, the responsible boundary
 * establishes that association.
 */
export interface EventHandler<TPayload = unknown> {

    /**
     * Processes a delivered event.
     */
    handle(
        envelope: EventEnvelope<TPayload>,
    ): Promise<void>;
}