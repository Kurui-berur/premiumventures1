import { FlowSession } from "../flow-session.contract";

export interface CompositionReader {

    requireFlowSession():FlowSession;

}