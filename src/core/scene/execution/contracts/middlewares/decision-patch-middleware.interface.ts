import { RuntimeMutation } from "src/core/flow/runtime/types/runtime-mutation.type";
import { ExecutionSession } from "../../context/execution-context.class";

export interface DecisionPatchMiddleware {

    execute(
        context: ExecutionSession,

        next:()=>Promise<void>

    ): Promise<void>
    
}