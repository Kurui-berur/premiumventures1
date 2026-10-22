export interface BaseEvent {
    readonly eventId: string;

    readonly eventType: string;

    readonly occurredAt: Date;
}