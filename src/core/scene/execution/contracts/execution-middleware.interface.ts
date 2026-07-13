import { ExecutionSession } from '../context/execution-context.class';


export interface ExecutionMiddleware {

  execute<TResult>(

    context:
      ExecutionSession,

    next:
      () => Promise<TResult>

  ): Promise<TResult>;

}