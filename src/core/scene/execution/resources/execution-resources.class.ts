import { GraphReader } from "src/graph/graph-core/contracts/graph-reader.interface";
import { ProjectionRuntimeReader } from "src/core/flow/runtime/contracts/reader/projection-runtime-reader.interface";

export class ExecutionResources {

    constructor(

        
        readonly graph: GraphReader,//This is the execution engine's way of reading the flow definition.
        //The important point is that execution receives a reader, not the graph as a mutable object.

        readonly runtime: ProjectionRuntimeReader,//"What is currently happening for this particular flow instance?"

    ) {}

}