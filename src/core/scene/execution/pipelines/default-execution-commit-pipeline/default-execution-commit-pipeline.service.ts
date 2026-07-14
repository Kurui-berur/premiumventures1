import { Inject, Injectable } from '@nestjs/common';
import { ExecutionCommitPipeline } from '../../contracts/pipelines/execution-commit-pipeline.interface';
import { ExecutionSession } from '../../context/execution-context.class';
import { ExecutionScope } from '../../types/execution-scope.type';
import { EXECUTION_TRACKER, MIDDLEWARE_CHAIN } from '../../tokens/execution.tokens';
import type { ExecutionTracker } from '../../contracts/execution-tracker.interface';
import type { MiddlewareChain } from '../../contracts/middlewares/middleware-chain.interface';
import { EXECUTION_COMMIT_MIDDLEWARE } from '../../tokens/middlewares/tokens-middlewares';
import { ExecutionCommitMiddleware } from '../../contracts/middlewares/execution-commit-middleware.interface';
import { RuntimeMutation } from 'src/core/flow/runtime/types/runtime-mutation.type';
import { RUNTIME_COORDINATOR } from 'src/core/flow/runtime/tokens/runtime-tokens';
import type { RuntimeCoordinator } from 'src/core/flow/runtime/contracts/runtime-coordinator.interface';

@Injectable()
export class DefaultExecutionCommitPipelineService implements ExecutionCommitPipeline {

    readonly scope: ExecutionScope=ExecutionScope.EXECUTION_COMMIT

    constructor(
        @Inject(EXECUTION_TRACKER)
        private readonly tracker:ExecutionTracker,

        @Inject(MIDDLEWARE_CHAIN)
        private middlewareChain:MiddlewareChain,

        @Inject(EXECUTION_COMMIT_MIDDLEWARE)
        private readonly middlewares:readonly ExecutionCommitMiddleware[],

        @Inject(RUNTIME_COORDINATOR)
        private readonly runtime:RuntimeCoordinator
    ){}



    async execute(context: ExecutionSession): Promise<void> {
        context.metadata.scope.enterScope(this.scope)

        try{
            await this.tracker.executionCommitStarted(context)

            await this.middlewareChain.execute(
                this.middlewares,

                (middleware,next)=>middleware.execute(context,next),

                async ()=>{

                    const diff=context.state.requireRuntimeDiff()

                    if(diff.isEmpty()){
                        return
                    }

                    const mutation:RuntimeMutation={
                        type:"PATCH",

                        patch:diff.patch
                    }

                    //delegation to runtime

                    await this.runtime.apply(context.frame.flowInstanceId,mutation)

                }

            )

        await this.tracker.executionCommitCompleted(
            context)


        }catch(error){

        await this.tracker.executionCommitFailed(
            context,
            error
        );

        throw error;


        }finally{

            context.metadata.scope.leaveScope()

        }

        
        
    }
}
