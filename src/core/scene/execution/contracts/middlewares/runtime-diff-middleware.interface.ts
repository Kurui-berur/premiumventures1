import { ExecutionSession } from "../../context/execution-session.class";

export interface RuntimeDiffMiddleware{
    execute(
        context:ExecutionSession,

        next:()=>Promise<void>
    ):Promise<void>
}