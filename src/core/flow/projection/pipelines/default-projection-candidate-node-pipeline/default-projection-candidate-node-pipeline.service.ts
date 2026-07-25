import { Inject, Injectable } from '@nestjs/common';
import { ProjectionCandidateNodePipeline } from '../../contracts/pipelines/projection-candidate-node-pipeline.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import { ProjectionScope } from '../../types/projection-scope.types';
import { PROJECTION_TRACKER } from '../../Tokens/tracker/projection-tracker.tokens';
import type { ProjectionTracker } from '../../contracts/tracker/projection-tracker.interface';
import type { MiddlewareChain } from 'src/core/scene/execution/contracts/middlewares/middleware-chain.interface';
import { MIDDLEWARE_CHAIN } from 'src/core/scene/execution/tokens/execution.tokens';
import { PROJECTION_MIDDLEWARE } from '../../Tokens/middlewares/projection-middleware.interface';
import type { ProjectionCandidateNodeExecutor } from '../../contracts/executors/projection-candidate-node-executor.interface';
import { ProjectionMiddleware } from '../../contracts/middlewares/projection-middleware.interface';
import { PROJECTION_CANDIDATE_NODE_EXECUTOR } from '../../Tokens/executors/executors.tokens';

@Injectable()
export class DefaultProjectionCandidateNodePipelineService implements ProjectionCandidateNodePipeline{
    readonly scope: ProjectionScope=ProjectionScope.CANDIDATE_NODES

    constructor(
              @Inject(PROJECTION_CANDIDATE_NODE_EXECUTOR)
                private readonly executor:ProjectionCandidateNodeExecutor,
        
                @Inject(PROJECTION_TRACKER)
                private readonly tracker:ProjectionTracker,
        
                @Inject(MIDDLEWARE_CHAIN)
                private readonly middlewareChain:MiddlewareChain,
        
                @Inject(PROJECTION_MIDDLEWARE)
                private readonly middlewares:readonly ProjectionMiddleware[]
            ){}

    


    async execute(session: ProjectionSession): Promise<void> {

        await session.metadata.scope.enterScope(this.scope)

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
 