import { ExecutionSession } from "../../../scene/execution/context/execution-session.class";
import { OperationHandler } from "./handler/operation-handler.interface";

export interface OperationResolver {

    resolve(
        context: ExecutionSession,
    ): Promise<OperationHandler>;

}