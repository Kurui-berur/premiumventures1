import { ExecutionSession } from "../../context/execution-context.class";

export interface ExecutionPipelineRunner {

  execute(
    context: ExecutionSession
  ): Promise<void>;

}