import { FlowView } from "src/core/flow/projection/contracts/nodes/flow-view.interface";
import { FlowRuntimeState } from "src/core/flow/runtime/state/flow-runtime-state";

export interface FlowSession {

    readonly runtime:
        Readonly<FlowRuntimeState>;

    readonly view:
        FlowView;

}