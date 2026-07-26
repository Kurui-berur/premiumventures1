import { CompositionFrame } from "src/flow/context/frame/composition-frame.interface";
import { FlowSession } from "../flow-session.contract";

export interface CompositionService {

    compose(

        frame: CompositionFrame,

    ): Promise<FlowSession>;

}