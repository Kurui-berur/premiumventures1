import { FlowRuntimeState } from "src/core/flow/runtime/state/flow-runtime-state";

export interface RuntimeSnapshotPort {

 get(
   flowId: string
 ): Promise<FlowRuntimeState>;

}