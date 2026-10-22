import { ExecutionSession } from "../../execution-session.class";
import { ExecutionRequest } from "../execution-request.interface";

export interface ExecutionInitializationPipeline {

    initialize(

        request: ExecutionRequest,

    ): Promise<ExecutionSession>;

}