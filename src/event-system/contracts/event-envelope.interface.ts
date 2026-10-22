import { EventRecord } from "./event-record.interface";

/**
 * Wraps an event with contextual metadata used by the event system.
 *
 * EventRecord describes what happened.
 * EventEnvelope describes the context in which the event participates.
 *
 * Correlation and causation do not change the identity or meaning
 * of the underlying event.
 */
export interface EventEnvelope<TPayload = unknown> {
    readonly event: EventRecord<TPayload>;
    readonly correlationId?: string;
   
}