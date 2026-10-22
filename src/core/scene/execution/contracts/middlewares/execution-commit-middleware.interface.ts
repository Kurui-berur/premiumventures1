import { ExecutionSession } from "../../context/execution-session.class";

export interface ExecutionCommitMiddleware{
    execute(
        context:ExecutionSession,

        next:()=>Promise<void>
    )
}