import { ProjectionCandidateNodeDescriptor } from "../descriptors/projection-candidate-node-descriptor.interface";
import { ProjectionGraph }
from "../graph/projection-graph.interface";


export interface ProjectionCandidateNodeDescriptorFactory {

    create(

        graph: ProjectionGraph,

    ): Promise<ProjectionCandidateNodeDescriptor>;

}