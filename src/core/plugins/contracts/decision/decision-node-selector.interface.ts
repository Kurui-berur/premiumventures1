import { ProjectionRuntimeReader } from "src/core/flow/runtime/contracts/reader/projection-runtime-reader.interface";
import { GraphReader } from "src/graph/graph-core/contracts/graph-reader.interface";
import { DecisionNode } from "src/graph/types/decision-node.types";

export interface DecisionNodeSelector {

    select(

        runtime: ProjectionRuntimeReader,

        graph: GraphReader,

    ): DecisionNode;

}