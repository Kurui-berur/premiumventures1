import { FlowView } from "src/core/flow/projection/contracts/nodes/flow-view.interface";
import { FlowRuntimeState } from "src/core/flow/runtime/state/flow-runtime-state";

export interface FlowSession {

    readonly executionId: string;

    readonly flowId: string;

    readonly flowInstanceId: string;

    readonly graphVersion: string;

    readonly runtime:
        FlowRuntimeState;

    readonly view:
        FlowView;

}