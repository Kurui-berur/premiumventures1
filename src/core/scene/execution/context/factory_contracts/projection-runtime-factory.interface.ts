import { ProjectionRuntimeReader } from "src/core/flow/runtime/contracts/reader/projection-runtime-reader.interface";

export interface ProjectionRuntimeFactory {

    create(

        flowInstanceId: string,

    ): Promise<ProjectionRuntimeReader>;

}