import { ExecutionSession } from "../../context/execution-context.class";

export interface ExecutionCommitMiddleware{
    execute(
        context:ExecutionSession,

        next:()=>Promise<void>
    )
}