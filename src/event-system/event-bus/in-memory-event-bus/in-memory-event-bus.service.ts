import { Injectable } from '@nestjs/common';

import { EventBus } from 'src/event-system/contracts/event-bus.interface';
import type { InMemoryEventBusOptions } from 'src/event-system/contracts/event-bus/in-memory-event-bus-options.interface';
import { EventEnvelope } from 'src/event-system/contracts/event-envelope.interface';
import { EventHandler } from 'src/event-system/contracts/event-handler.interface';
import { EventSubscription } from 'src/event-system/contracts/event-subscription.interface';


/**
 * Internal representation of a subscription held by the
 * in-memory EventBus.
 *
 * This is deliberately an implementation detail.
 *
 * EventSubscription is the public capability returned to consumers.
 * StoredSubscription contains the state required by the in-memory
 * implementation to manage that capability.
 *
 * A subscription is a long-lived relationship between an event type
 * and a handler.
 *
 * It is not:
 *
 * - an event;
 * - a publication;
 * - a delivery;
 * - a delivery attempt.
 *
 * Lifecycle:
 *
 *     created
 *        │
 *        ▼
 *     active
 *        │
 *        │ unsubscribe()
 *        ▼
 *    inactive
 */
interface StoredSubscription {
    readonly eventType: string;
    readonly handler: EventHandler<unknown>;
    active: boolean;
}


@Injectable()
export class InMemoryEventBusService implements EventBus {

    /**
     * Registry of subscriptions indexed by event type.
     *
     * The EventBus only needs the event type to determine which
     * subscriptions are candidates for a publication.
     *
     * The bus deliberately does not associate an event type with:
     *
     * - a FlowContext;
     * - a domain context;
     * - a flow;
     * - a domain;
     * - a particular consumer.
     *
     * Those associations are established outside the EventBus by
     * the responsible consumer boundary.
     *
     * The registry stores subscriptions, not deliveries.
     *
     * One subscription can therefore participate in many independent
     * publications:
     *
     *     Subscription
     *          │
     *          ├── Publication 1 → Delivery
     *          ├── Publication 2 → Delivery
     *          └── Publication 3 → Delivery
     */
    private readonly subscriptions = new Map<
        string,
        Set<StoredSubscription>
    >();


    /**
     * Observes a failed delivery attempt.
     *
     * This hook exists to make failures observable by the in-memory
     * implementation.
     *
     * A failure observed here means:
     *
     *     "This delivery attempt failed."
     *
     * It does not mean:
     *
     *     "The event failed."
     *
     * The EventBus does not decide:
     *
     * - whether the delivery should be retried;
     * - how many attempts are allowed;
     * - whether the event should be dead-lettered;
     * - how a failed delivery should be recovered.
     *
     * Those are delivery-infrastructure concerns.
     */
    private readonly onDeliveryError?: (
        error: unknown,
        envelope: EventEnvelope,
    ) => void;


    constructor(
        options: InMemoryEventBusOptions = {},
    ) {
        this.onDeliveryError = options.onDeliveryError;
    }


    /**
     * Establishes a subscription for an event type.
     *
     * A subscription represents a consumer's interest in future
     * publications of the specified event type.
     *
     * The returned EventSubscription gives the consumer the capability
     * to terminate that relationship.
     *
     * Calling unsubscribe():
     *
     * - marks the subscription inactive;
     * - removes it from future target selection;
     * - does not cancel a delivery whose target was already established.
     *
     * unsubscribe() is idempotent.
     *
     * Calling it multiple times has no additional effect.
     *
     * Example:
     *
     *     const subscription = bus.subscribe(
     *         'answer.submitted',
     *         answerSubmittedHandler,
     *     );
     *
     *     subscription.unsubscribe();
     *
     * The EventBus does not interpret the meaning of the event or
     * establish its domain ownership.
     *
     * For example, an answer.submitted event might eventually be
     * associated with a FlowContext by the responsible consumer.
     */
    subscribe<TPayload>(
        eventType: string,
        handler: EventHandler<TPayload>,
    ): EventSubscription {

        const subscription: StoredSubscription = {
            eventType,
            handler: handler as EventHandler<unknown>,
            active: true,
        };


        let subscriptions =
            this.subscriptions.get(eventType);

        if (!subscriptions) {
            subscriptions = new Set();

            this.subscriptions.set(
                eventType,
                subscriptions,
            );
        }


        subscriptions.add(subscription);


        return {
            unsubscribe: () => {

                /*
                 * unsubscribe() is idempotent.
                 *
                 * Once inactive, this subscription cannot affect
                 * future target selection.
                 */
                if (!subscription.active) {
                    return;
                }


                /*
                 * Mark the subscription inactive before removing it
                 * from the registry.
                 */
                subscription.active = false;


                /*
                 * Remove this exact subscription from the registry.
                 *
                 * This affects future publications only.
                 *
                 * A publication that has already established this
                 * subscription as a target is not cancelled here.
                 */
                subscriptions!.delete(subscription);


                /*
                 * Remove empty event-type buckets.
                 *
                 * The registry therefore contains only event types
                 * that currently have registered subscriptions.
                 */
                if (subscriptions!.size === 0) {
                    this.subscriptions.delete(eventType);
                }
            },
        };
    }


    /**
     * Publishes an event for delivery.
     *
     * Each invocation of publish() represents a new publication
     * operation.
     *
     * The EventBus does not deduplicate publications based on:
     *
     * - event identity;
     * - correlationId;
     * - payload;
     * - object identity.
     *
     * Therefore, publishing the same envelope multiple times may
     * result in multiple independent delivery attempts.
     *
     * Publication and delivery are separate concerns.
     *
     * The publication process is:
     *
     *     publish()
     *         │
     *         ▼
     *     establish target snapshot
     *         │
     *         ▼
     *     start delivery attempts
     *         │
     *         ▼
     *     publish() resolves
     *
     * publish() does not wait for handlers to complete.
     *
     * Therefore:
     *
     *     publish resolved
     *         ≠
     *     all handlers completed
     *
     * A handler's success or failure belongs to its individual
     * delivery attempt.
     */
    async publish<TPayload>(
        envelope: EventEnvelope<TPayload>,
    ): Promise<void> {

        /*
         * Establish the publication's delivery targets before
         * beginning delivery.
         *
         * This creates a stable target snapshot.
         */
        const targets = this.snapshotTargets<TPayload>(
            envelope.event.eventType,
        );


        /*
         * Every established target receives an independent delivery
         * attempt.
         *
         * Delivery is intentionally not awaited.
         */
        for (const handler of targets) {
            this.deliver(
                handler,
                envelope,
            );
        }
    }


    /**
     * Establishes the delivery targets for a publication.
     *
     * Only subscriptions that are active when this method executes
     * become targets of the publication.
     *
     * Once the snapshot has been created, subsequent subscription
     * changes do not modify the target set for this publication.
     *
     * Stable publication semantics:
     *
     *     subscribe before snapshot
     *         → included
     *
     *     unsubscribe before snapshot
     *         → excluded
     *
     *     unsubscribe after snapshot
     *         → may still receive the publication
     *
     *     subscribe after snapshot
     *         → does not receive the publication
     *
     * The snapshot contains handlers only.
     *
     * Delivery identity, attempt tracking, retry policy, and
     * dead-letter policy are not represented here.
     */
    private snapshotTargets<TPayload>(
        eventType: string,
    ): readonly EventHandler<TPayload>[] {

        const subscriptions =
            this.subscriptions.get(eventType);


        /*
         * No subscriptions means there are no delivery targets.
         *
         * This is a valid publication.
         */
        if (!subscriptions) {
            return [];
        }


        /*
         * Copy the Set into a new array.
         *
         * This establishes the target snapshot independently from
         * the live subscription registry.
         */
        return [...subscriptions]
            .filter(subscription => subscription.active)
            .map(subscription =>
                subscription.handler as EventHandler<TPayload>,
            );
    }


    /**
     * Starts one delivery attempt for an established target.
     *
     * The handler's Promise represents the outcome of this delivery
     * attempt:
     *
     *     resolve
     *         → delivery attempt succeeded
     *
     *     reject
     *         → delivery attempt failed
     *
     * The handler is intentionally not awaited by publish().
     *
     * This means:
     *
     * - one handler does not block another handler;
     * - handler completion does not determine publication completion;
     * - a handler failure does not prevent other established targets
     *   from being attempted.
     *
     * A failure is passed to the implementation's failure observer.
     *
     * Retry, attempt counting, and dead-letter behavior are deliberately
     * outside this method.
     */
    private deliver<TPayload>(
        handler: EventHandler<TPayload>,
        envelope: EventEnvelope<TPayload>,
    ): void {

        /*
         * Detach the handler's Promise from publish().
         *
         * The catch prevents the rejected Promise from becoming an
         * unhandled rejection while preserving the failure as an
         * observable delivery-attempt failure.
         */
        void handler.handle(envelope)
            .catch(error => {

                this.onDeliveryError?.(
                    error,
                    envelope,
                );
            });
    }
}