import { ProjectionCandidateNodeDescriptor }
from "../descriptors/projection-candidate-node-descriptor.interface";
import { ProjectionCandidateNodeSet } from "../nodes/ProjectionCandidateNodeSet.interface";


export interface ProjectionCandidateNodeFactory {

    assemble(

        descriptor:
            ProjectionCandidateNodeDescriptor,

    ): Promise<ProjectionCandidateNodeSet>;

}