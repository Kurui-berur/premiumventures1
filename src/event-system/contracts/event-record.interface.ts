/**
 * An immutable fact that something happened.
 *
 * EventRecord describes the event itself.
 * Delivery, retry, subscription, correlation, and causation
 * are intentionally modeled outside the record.
 *
 * The producer that knows the fact has occurred creates the record.
 * EventBus does not create or modify it.
 */
export interface EventRecord<TPayload = unknown> {
    readonly eventId: string;
    readonly eventType: string;
    readonly occurredAt: number;
    readonly payload: TPayload;
}