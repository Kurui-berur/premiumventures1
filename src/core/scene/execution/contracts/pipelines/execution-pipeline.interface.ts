import { ExecutionSession } from "../../context/execution-session.class";
import { ExecutionScope } from "../../types/execution-scope.type";

export interface ExecutionPipeline {

  readonly scope:
    ExecutionScope;

  execute(
    context: ExecutionSession
  ): Promise<void>;

}