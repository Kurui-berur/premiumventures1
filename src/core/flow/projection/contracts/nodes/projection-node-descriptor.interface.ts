import { ProjectionCandidateNodeSet } from "./ProjectionCandidateNodeSet.interface";

export interface ProjectionNodeDescriptor {

    readonly candidateNodes:
        ProjectionCandidateNodeSet;

    readonly nodeIds:
        ReadonlySet<string>;

    readonly sceneIndex:
        ReadonlyMap<
            string,
            readonly string[]
        >;

}