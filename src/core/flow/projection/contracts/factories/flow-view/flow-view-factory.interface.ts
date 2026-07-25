import { FlowViewDescriptor } from "../../descriptors/flow-view-descriptor.interface";
import { FlowView } from "../../nodes/flow-view.interface";

export interface FlowViewFactory {

    create(

        descriptor: FlowViewDescriptor,

    ): Promise<FlowView>;

}