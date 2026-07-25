import { Inject, Injectable } from '@nestjs/common';
import { ProjectionNodePipeline } from '../../contracts/pipelines/projection-node-pipeline.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import { ProjectionScope } from '../../types/projection-scope.types';
import type { MiddlewareChain } from 'src/core/scene/execution/contracts/middlewares/middleware-chain.interface';
import { Middleware } from 'src/core/scene/execution/contracts/middlewares/middleware.interface';
import { MIDDLEWARE_CHAIN } from 'src/core/scene/execution/tokens/execution.tokens';
import type { ProjectionNodeExecutor } from '../../contracts/executors/projection-node-executor.interface';
import { PROJECTION_TRACKER } from '../../Tokens/tracker/projection-tracker.tokens';
import type { ProjectionTracker } from '../../contracts/tracker/projection-tracker.interface';
import { ProjectionMiddleware } from '../../contracts/middlewares/projection-middleware.interface';
import { PROJECTION_MIDDLEWARE } from '../../Tokens/middlewares/projection-middleware.interface';
import { PROJECTION_NODE_EXECUTOR } from '../../Tokens/executors/executors.tokens';

@Injectable()
export class DefaultProjectionNodePipelineService implements ProjectionNodePipeline {


   readonly scope: ProjectionScope=ProjectionScope.NODES

   constructor(
    @Inject(PROJECTION_TRACKER)
    private readonly tracker:ProjectionTracker,

    @Inject(MIDDLEWARE_CHAIN,)
    private readonly middlewareChain: MiddlewareChain,

    @Inject( PROJECTION_NODE_EXECUTOR)
    private readonly executor: ProjectionNodeExecutor,

    @Inject(PROJECTION_MIDDLEWARE)
    private readonly middlewares:readonly ProjectionMiddleware[],

    

   ){

   }

   async execute(session: ProjectionSession): Promise<void> {

     session.metadata.scope.enterScope(this.scope)

             try {
    
            await this.tracker.stageStarted(this.scope,session)
            
            await this.middlewareChain.execute(

                this.middlewares,

                (middleware,next)=>middleware.execute(session,next),
                async ()=>this.executor.execute(session)

            )

          await this.tracker.stageCompleted(this.scope,session)
            
        } 
        catch (error) {

            await this.tracker.stageFailed(this.scope,session,error)
            
        }finally{
            session.metadata.scope.leaveScope()
        }
    }
}
