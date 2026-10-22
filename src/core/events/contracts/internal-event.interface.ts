import { EngineModule } from "../types/engineModule.types";
import { BaseEvent } from "./base-event.interface";

interface InternalEvent<TContext = unknown> extends BaseEvent {
    readonly sourceModule: EngineModule;
    
    readonly context: TContext;
}