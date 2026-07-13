import { Inject, Injectable } from '@nestjs/common';
import { RuntimePipeline } from '../../contracts/pipelines/runtime-pipeline.interface';
import { ExecutionSession } from '../../context/execution-context.class';
import { ExecutionScope } from '../../types/execution-scope.type';
import { EXECUTION_TRACKER, MIDDLEWARE_CHAIN } from '../../tokens/execution.tokens';
import type { ExecutionTracker } from '../../contracts/execution-tracker.interface';
import { RUNTIME_MIDDLEWARE } from '../../tokens/middlewares/tokens-middlewares';
import { RuntimeMiddleware } from '../../contracts/middlewares/runtime-middleware.interface';
import type { MiddlewareChain } from '../../contracts/middlewares/middleware-chain.interface';
import { RUNTIME_COORDINATOR } from 'src/core/flow/runtime/tokens/runtime-tokens';
import type { RuntimeCoordinator } from 'src/core/flow/runtime/contracts/runtime-coordinator.interface';

@Injectable()
export class DefaultRuntimePipelineService implements RuntimePipeline {
    constructor(
        @Inject(EXECUTION_TRACKER)
        private readonly tracker:ExecutionTracker,

        @Inject(RUNTIME_MIDDLEWARE)
        private readonly middlewares:readonly RuntimeMiddleware[],

        @Inject(MIDDLEWARE_CHAIN)
        private readonly middlewareChain:MiddlewareChain,

        @Inject(RUNTIME_COORDINATOR)
        private readonly runtime:RuntimeCoordinator,

    ){

    }
    readonly scope: ExecutionScope=ExecutionScope.RUNTIME
   async execute(context: ExecutionSession): Promise<void> {

    context.metadata.scope.enterScope(this.scope)
    
        try{
            await this.tracker.runtimeStarted(context);

            

            const mutation=context.state.requireRuntimeMutation()

            await this.middlewareChain.execute(
                this.middlewares,
                (middleware,next)=>middleware.execute(context,next),
                async ()=>{
                    await this.runtime.apply(context.frame.flowInstanceId,mutation)
                }
            )
            context.metadata.scope.leaveScope()

            await this.tracker.runtimeCompleted(context)
        }
        catch(error){
            await this.tracker.runtimeFailed(context,error)
            throw error
        }
    }
}
