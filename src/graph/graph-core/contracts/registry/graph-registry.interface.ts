import { GraphReader } from "src/graph/graph-core/contracts/graph-reader.interface";

export interface GraphRegistry {

    resolve(

        graphVersion: string,

    ): Promise<GraphReader>;

        register(
        graphVersion: string,
        graph: GraphReader,
    ): Promise<void> | void;


}