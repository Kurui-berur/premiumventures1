import { EventEnvelope } from "../event-envelope.interface";

export interface InMemoryEventBusOptions {
    readonly onDeliveryError?: (
        error: unknown,
        envelope: EventEnvelope,
    ) => void;
}