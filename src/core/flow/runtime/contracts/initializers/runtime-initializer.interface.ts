import { FlowRuntimeState } from "../../state/flow-runtime-state";

export interface RuntimeInitializer {

    initialize(

        flowInstanceId: string,

        initialState: FlowRuntimeState,

    ): Promise<void>;

}