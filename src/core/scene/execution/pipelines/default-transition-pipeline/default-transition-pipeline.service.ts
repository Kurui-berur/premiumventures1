import { Inject, Injectable } from '@nestjs/common';
import { TransitionPipeline } from '../../contracts/pipelines/transition-pipeline.interface';
import { ExecutionSession } from '../../context/execution-context.class';
import { ExecutionScope } from '../../types/execution-scope.type';
import { EXECUTION_TRACKER, MIDDLEWARE_CHAIN, TRANSITION_EXECUTOR } from '../../tokens/execution.tokens';
import type { TransitionExecutor } from '../../contracts/transition-executor.interface';
import type { ExecutionTracker } from '../../contracts/execution-tracker.interface';
import type { MiddlewareChain } from '../../contracts/middlewares/middleware-chain.interface';
import { TRANSITION_MIDDLEWARE } from '../../tokens/middlewares/tokens-middlewares';
import { TransitionMiddleware } from '../../contracts/middlewares/transition-middleware.interface';

@Injectable()
export class DefaultTransitionPipelineService implements TransitionPipeline{

    

    constructor(
       
         @Inject(TRANSITION_EXECUTOR )
         private readonly executor: 
         TransitionExecutor,
         
         @Inject(EXECUTION_TRACKER)
         private readonly tracker:
         ExecutionTracker,
         
         @Inject(MIDDLEWARE_CHAIN )
         private readonly middlewareChain:
         MiddlewareChain,
         
         @Inject( TRANSITION_MIDDLEWARE)
         private readonly middlewares:
         readonly TransitionMiddleware[]

    ){}

    readonly scope: ExecutionScope=ExecutionScope.TRANSITION

    async execute(context: ExecutionSession): Promise<void> 
    {

        context.metadata.scope.enterScope(this.scope)
        try{
            await  this.tracker.transitionStarted(context)

            await this.middlewareChain.execute(
                this.middlewares,
                (middleware,next)=>middleware.execute(
                    context,next
                ),
                async ()=> this.executor.execute(context)
            )

            await this.tracker.transitionCompleted(context)


        }catch(error){
            await this.tracker.transitionFailed(context,error)
        }finally{
            context.metadata.scope.leaveScope()
        }

        
    }
}
