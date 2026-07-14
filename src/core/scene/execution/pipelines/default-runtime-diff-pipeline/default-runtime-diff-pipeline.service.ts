import { Inject, Injectable } from '@nestjs/common';
import { RuntimeDiffPipeline } from '../../../../flow/runtime/contracts/pipelines/runtime-diff-pipeline.interface';
import { ExecutionSession } from '../../context/execution-context.class';
import { ExecutionScope } from '../../types/execution-scope.type';
import { RUNTIME_PATCH_BUILDER } from 'src/core/flow/runtime/tokens/runtime-tokens';
import type { RuntimePatchBuilder } from 'src/core/flow/runtime/contracts/runtime-patch-bulder.interface';
import { RuntimeDiff } from '../../context/runtime/runtime-diff.class';
import { EXECUTION_TRACKER, MIDDLEWARE_CHAIN } from '../../tokens/execution.tokens';
import type { ExecutionTracker } from '../../contracts/execution-tracker.interface';
import type { MiddlewareChain } from '../../contracts/middlewares/middleware-chain.interface';
import { RUNTIME_DIFF_MIDDLEWARE } from '../../tokens/middlewares/tokens-middlewares';
import { RuntimeDiffMiddleware } from '../../contracts/middlewares/runtime-diff-middleware.interface';

@Injectable()
export class DefaultRuntimeDiffPipelineService implements RuntimeDiffPipeline{
   readonly scope: ExecutionScope=ExecutionScope.RUNTIME_DIFF
   constructor(
      @Inject(RUNTIME_PATCH_BUILDER)
      private readonly patches:RuntimePatchBuilder,

      @Inject(EXECUTION_TRACKER)
      private readonly tracker:ExecutionTracker,

      @Inject(MIDDLEWARE_CHAIN)
      private readonly middlewarechain:MiddlewareChain,

      @Inject(RUNTIME_DIFF_MIDDLEWARE)
      private readonly middlewares:readonly RuntimeDiffMiddleware[]

   ){}
    async execute(context: ExecutionSession): Promise<void> {

        context.metadata.scope.enterScope(this.scope)

        try{
            
            await this.tracker.runtimeDiffStarted(context)

            await this.middlewarechain.execute(
                this.middlewares,

                (middleware,next)=>middleware.execute(context,next),

                async ()=>{

                            const original=context.frame.state

                            const  current=context.runtime.current()
                            
                            const patches=this.patches.sceneTransition(original,current)

                            const runtimediff=new RuntimeDiff(patches)

                            context.state.recordRuntimeDiff(runtimediff)

                }

                
            )
            

            await this.tracker.runtimeDiffCompleted(context)

        }
          
        catch(error){
        this.tracker.runtimeDiffFailed(context,error)

        throw error
    }  finally{
        context.metadata.scope.leaveScope()
    }




    }
  
}
