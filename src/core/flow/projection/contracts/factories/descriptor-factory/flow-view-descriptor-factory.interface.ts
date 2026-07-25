import { ProjectionSession } from "../../../context/projection-session.interface";
import { FlowViewDescriptor } from "../../descriptors/flow-view-descriptor.interface";

export interface FlowViewDescriptorFactory {

    create(

        session: ProjectionSession,

    ): Promise<FlowViewDescriptor>;

}