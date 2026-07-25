import { ProjectionNodeDescriptor } from "../../nodes/projection-node-descriptor.interface";
import { ProjectionNodeSet } from "../../nodes/projection-node-set.interface";

export interface ProjectionNodeFactory {

    assemble(

        descriptor: ProjectionNodeDescriptor,

    ): Promise<ProjectionNodeSet>;

}