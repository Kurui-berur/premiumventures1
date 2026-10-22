import { ExecutionSession } from '../context/execution-session.class';


export interface ExecutionMiddleware {

  execute<TResult>(

    context:
      ExecutionSession,

    next:
      () => Promise<TResult>

  ): Promise<TResult>;

}