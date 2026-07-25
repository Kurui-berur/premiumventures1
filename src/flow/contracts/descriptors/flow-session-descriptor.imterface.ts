import { FlowView } from "src/core/flow/projection/contracts/nodes/flow-view.interface";
import { FlowRuntimeState } from "src/core/flow/runtime/state/flow-runtime-state";

export interface FlowSessionDescriptor {

    executionId: string;

    flowId: string;

    flowInstanceId: string;

    graphVersion: string;

    runtime:
        FlowRuntimeState;

    view:
        FlowView;

}