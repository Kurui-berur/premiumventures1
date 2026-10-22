import { EventEnvelope } from './event-envelope.interface';
import { EventHandler } from './event-handler.interface';
import { EventSubscription } from './event-subscription.interface';

/**
 * Domain-agnostic asynchronous Event Bus.
 *
 * The Event Bus provides the communication boundary between
 * event producers and event consumers.
 *
 * Responsibilities:
 *
 * - accept events for delivery;
 * - route events to interested handlers;
 * - manage subscriptions.
 *
 * The Event Bus does not:
 *
 * - interpret event meaning;
 * - establish flow ownership;
 * - create execution requests;
 * - evaluate decisions;
 * - mutate runtime state.
 *
 * Publication is asynchronous. A successful publish() means that
 * the Event Bus accepted the event for delivery; it does not mean
 * that every consumer has completed processing it.
 *
 * Example:
 *
 *     payment.completed
 *            │
 *            ▼
 *        EventBus
 *            │
 *       ┌────┴────┐
 *       ▼         ▼
 *   Consumer A  Consumer B
 */
export interface EventBus {

    /**
     * Publishes an event for asynchronous delivery.
     */
    publish<TPayload>(
        envelope: EventEnvelope<TPayload>,
    ): Promise<void>;

    /**
     * Registers a handler for an event type.
     *
     * Returns a subscription that can be used to stop
     * future deliveries through this subscription.
     */
    subscribe<TPayload>(
        /**Given what we've established about keeping the Event System domain-agnostic, I think the generic string boundary is the correct foundation.

Type safety can be introduced above this boundary by typed domain-specific adapters. */
        eventType: string,
        handler: EventHandler<TPayload>,
    ): EventSubscription;
}