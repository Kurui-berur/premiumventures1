import { ExecutionSession } from "../../context/execution-session.class";

export interface ERuntimeMiddleware {

  execute(

    context: ExecutionSession,

    next: () => Promise<void>

  ): Promise<void>;

}