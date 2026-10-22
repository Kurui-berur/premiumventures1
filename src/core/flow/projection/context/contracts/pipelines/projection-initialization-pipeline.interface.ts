import { ProjectionSession } from "../../projection-session.interface";
import { ProjectionRequest } from "../initialization/projection-request.interface";

export interface ProjectionInitializationPipeline {

    initialize(

        request: ProjectionRequest,

    ): Promise<ProjectionSession>;

}