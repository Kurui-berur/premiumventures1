import { FlowRuntimeState } from "src/core/flow/runtime/state/flow-runtime-state";
import { FlowSession } from "../models/flow-session.interface";
import { SceneEvent } from "src/core/events/types/scene-event.type";

export interface FlowApplication {

  open( flowId: string ): Promise<FlowSession>;

   snapshot(flowId: string): Promise<FlowRuntimeState>;

   dispatch(flowId: string,event: SceneEvent): Promise<FlowRuntimeState>;

}