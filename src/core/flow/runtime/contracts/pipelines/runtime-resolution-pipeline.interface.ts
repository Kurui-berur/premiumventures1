import { ProjectionRuntimeReader } from "../reader/projection-runtime-reader.interface";
import { RuntimeStore } from "../runtime-store.interface";

export interface RuntimeResolutionPipeline {

    execute(

        flowInstanceId: string,

    ): Promise<ProjectionRuntimeReader>;

}