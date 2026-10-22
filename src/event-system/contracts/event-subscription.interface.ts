export interface EventSubscription {

    /**
     * A subscription is evaluated when an event's delivery targets are established. Unsubscribing removes the subscription from future deliveries but does not cancel an already-established delivery.
     * Responsibility:
     * Represents a consumer's subscription relationship with the Event Bus and provides a way to terminate future delivery through that subscription
     * Stops this subscription.
     *
     * After unsubscribe() completes, the associated handler
     * must no longer receive newly delivered events through
     * this subscription.
     *
     * Calling unsubscribe() more than once must be safe. 
     * unsubscribe() should mean:

     * No new deliveries should be scheduled through this subscription.
     * 
     * Before unsubscribe:

    *   EventBus
    *    │
    *    ├── answer.submitted
    *    │
    *    ▼
    * Handler


        After unsubscribe:

        EventBus
        │
        └── answer.submitted
                ✕
            Handler
     
            */
    unsubscribe(): void;
}