import { FlowView } from "src/core/flow/projection/contracts/nodes/flow-view.interface";
import { FlowSessionRuntime } from "src/flow/context/state/flow-session-runtime.class";
import { FlowSession } from "src/flow/contracts/flow-session.contract";

export class DefaultFlowSession
implements FlowSession {

    constructor(

        readonly runtime:
            FlowSessionRuntime,

        readonly view:
            FlowView,

    ) {

        Object.freeze(this);

    }

}