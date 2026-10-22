import { ExecutionSession } from "../../context/execution-session.class";

        export interface TransitionMiddleware {
        
          execute(
        
            context: ExecutionSession,
        
            next: () => Promise<void>
        
          ): Promise<void>;
        
        }