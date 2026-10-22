import { SceneEvent } from "src/core/events/types/scene-event.type";
import { OperationHandler } from "src/core/plugins/contracts/decision/handler/operation-handler.interface";

export interface FlowPlugin {

  readonly id: string;

    resolveOperation(
        operation: string,
    ): OperationHandler;

}