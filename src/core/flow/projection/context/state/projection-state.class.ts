import { ProjectionGraph } from "../../contracts/graph/projection-graph.interface";
import { ProjectionCandidateNodeState } from "./classes/projection-candidate-node-state.class";
import { ProjectionFlowViewState } from "./classes/projection-flow-view-state.class";
import { ProjectionNodeState } from "./classes/projection-node-set.class";
import { ProjectionSeed } from "./projection-seed.interface";

export class ProjectionState {

  private seed?: ProjectionSeed;

  private projectionGraph?:ProjectionGraph


    readonly candidateNodes =
        new ProjectionCandidateNodeState();

    readonly projectionNodes=new ProjectionNodeState() 

   readonly flowView =new ProjectionFlowViewState();

  setSeed(
    seed: ProjectionSeed
  ): void {

    this.seed = seed;

  }

  requireSeed(): ProjectionSeed {

    if (!this.seed) {

      throw new Error(
        'ProjectionState does not contain a projection seed.'
      );

    }

    return this.seed;

  }
    setProjectionGraph(graph: ProjectionGraph): void{
        this.projectionGraph = graph;
    }

    requireProjectionGraph(): ProjectionGraph {
        if (!this.projectionGraph) {
            throw new Error(
                'ProjectionState does not contain a projection graph.'
            );
        }

        return this.projectionGraph;
    }

}