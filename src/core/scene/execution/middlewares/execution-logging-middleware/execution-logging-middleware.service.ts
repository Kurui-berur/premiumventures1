import { Inject, Injectable } from '@nestjs/common';
import { ExecutionMiddleware } from '../../contracts/execution-middleware.interface';
import { EXECUTION_TRACKER } from '../../tokens/execution.tokens';
import { ExecutionFrame } from '../../contracts/execution-frame.interface';
import type { ExecutionTracker } from '../../contracts/execution-tracker.interface';

@Injectable()
export class ExecutionLoggingMiddlewareService implements ExecutionMiddleware{

    constructor(
        @Inject(EXECUTION_TRACKER)
        private readonly tracker:ExecutionTracker,

    ){

    }
    async execute<TResult>(frame:ExecutionFrame,
        next:()=>Promise<TResult>): 
    Promise<TResult>{
        
        await this.tracker.transactionStarted(frame);

        try{
            const result =await next();
            
             await this.tracker.transactionCompleted(frame);

             
            return result;
            
           

        }
        catch(error){

        await this.tracker.transactionFailed(frame,error);

        throw error;

        }

        }
}
