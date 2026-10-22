import { ExecutionSession } from "../../context/execution-session.class";

export interface ExecutionPipelineRunner {

  execute(
    context: ExecutionSession
  ): Promise<void>;

}