import { FlowRuntimeState } from "src/core/flow/runtime/state/flow-runtime-state";

export interface RuntimeReaderPort {

 load(
   flowId: string
 ): Promise<FlowRuntimeState>;

}