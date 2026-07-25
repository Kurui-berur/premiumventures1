import { ProjectionSession } from "../../../context/projection-session.interface";
import { ProjectionNodeDescriptor } from "../../nodes/projection-node-descriptor.interface";

export interface ProjectionNodeDescriptorFactory {

    create(

        session: ProjectionSession,

    ): Promise<ProjectionNodeDescriptor>;

}