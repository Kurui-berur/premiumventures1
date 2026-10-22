import { EventHandler } from "../event-handler.interface";

interface StoredSubscription<TPayload> {
    readonly eventType: string;
    readonly handler: EventHandler<TPayload>;
    active: boolean;
}