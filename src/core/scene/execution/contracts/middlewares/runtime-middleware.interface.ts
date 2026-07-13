import { ExecutionSession } from "../../context/execution-context.class";

export interface RuntimeMiddleware {

  execute(

    context: ExecutionSession,

    next: () => Promise<void>

  ): Promise<void>;

}