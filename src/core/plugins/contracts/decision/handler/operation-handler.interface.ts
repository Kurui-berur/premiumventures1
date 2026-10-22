import { ExecutionSession } from "../../../../scene/execution/context/execution-session.class";

export interface OperationHandler<TResult = unknown> {

    readonly operation: string;

    execute(
        context: ExecutionSession,
    ): Promise<TResult>;

}