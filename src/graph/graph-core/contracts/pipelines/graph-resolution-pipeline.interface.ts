import { GraphReader } from "../graph-reader.interface";

export interface GraphResolutionPipeline{
         execute(

        graphVersion: string,

    ): Promise<GraphReader>
}