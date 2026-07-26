import { FlowView } from "../nodes/flow-view.interface";

export interface ProjectionReader {

    requireFlowView():
        FlowView;

}