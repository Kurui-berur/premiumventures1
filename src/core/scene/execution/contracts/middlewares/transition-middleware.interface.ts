import { ExecutionSession } from "../../context/execution-context.class";

        export interface TransitionMiddleware {
        
          execute(
        
            context: ExecutionSession,
        
            next: () => Promise<void>
        
          ): Promise<void>;
        
        }