import { ExecutionSession } from "../../context/execution-context.class";

export interface RuntimeDiffMiddleware{
    execute(
        context:ExecutionSession,

        next:()=>Promise<void>
    ):Promise<void>
}