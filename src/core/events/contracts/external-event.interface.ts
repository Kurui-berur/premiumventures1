
import { ExternalEventOrigin } from "../types/external-event-origin.types ";
import { BaseEvent } from "./base-event.interface";

export interface ExternalEvent<TPayload = unknown> extends BaseEvent {

    readonly origin: ExternalEventOrigin;

    readonly payload: TPayload;

}