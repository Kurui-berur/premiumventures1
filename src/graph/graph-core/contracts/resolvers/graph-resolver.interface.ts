import { GraphReader } from "../graph-reader.interface";

export interface GraphResolver {

    resolve(

        graphVersion: string,

    ): Promise<GraphReader>;

}