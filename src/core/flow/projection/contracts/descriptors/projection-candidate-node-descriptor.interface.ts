import { ProjectionGraph } from "../graph/projection-graph.interface";

export interface ProjectionCandidateNodeDescriptor {

    readonly projectionGraph: ProjectionGraph;

    readonly nodeIds: ReadonlySet<string>;

    readonly sceneIndex: ReadonlyMap<
        string,
        readonly string[]
    >;


}