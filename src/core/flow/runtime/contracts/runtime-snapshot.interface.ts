import { FlowRuntimeState } from "src/core/flow/runtime/state/flow-runtime-state";


export interface RuntimeSnapshot {

capture():
Promise<
FlowRuntimeState
>;

restore(
state:
FlowRuntimeState
): Promise<void>;

}