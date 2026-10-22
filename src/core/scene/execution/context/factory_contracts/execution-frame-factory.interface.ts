import { ExecutionFrame } from "../../contracts/execution-frame.interface";
import { ExecutionResources } from "../../resources/execution-resources.class";
import { ExecutionRequest } from "../contracts/execution-request.interface";

export interface ExecutionFrameFactory {

    create(

        request: ExecutionRequest,

        resources: ExecutionResources,

    ): Promise<ExecutionFrame>;

}