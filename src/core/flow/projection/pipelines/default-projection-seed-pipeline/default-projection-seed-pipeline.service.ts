import { Inject, Injectable } from '@nestjs/common';
import { ProjectionSeedPipeline } from '../../contracts/pipelines/projection-seed-pipeline.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import type { ProjectionSeedExecutor } from '../../contracts/executors/projection-seed-executors.interface';
import { PROJECTION_SEED_EXECUTOR } from '../../Tokens/executors/executors.tokens';
import { ProjectionScope } from '../../types/projection-scope.types';
import { PROJECTION_TRACKER } from '../../Tokens/tracker/projection-tracker.tokens';
import type { ProjectionTracker } from '../../contracts/tracker/projection-tracker.interface';
import { MIDDLEWARE_CHAIN } from 'src/core/scene/execution/tokens/execution.tokens';
import type { MiddlewareChain } from 'src/core/scene/execution/contracts/middlewares/middleware-chain.interface';
import { PROJECTION_MIDDLEWARE } from '../../Tokens/middlewares/projection-middleware.interface';
import { ProjectionMiddleware } from '../../contracts/middlewares/projection-middleware.interface';

@Injectable()
export class DefaultProjectionSeedPipelineService implements ProjectionSeedPipeline{
    constructor(
        @Inject(PROJECTION_SEED_EXECUTOR)
        private readonly executor:ProjectionSeedExecutor,

        @Inject(PROJECTION_TRACKER)
        private readonly tracker:ProjectionTracker,

        @Inject(MIDDLEWARE_CHAIN)
        private readonly middlewareChain:MiddlewareChain,

        @Inject(PROJECTION_MIDDLEWARE)
        private readonly middlewares:readonly ProjectionMiddleware[]

    ){}
    readonly scope= ProjectionScope.SEED
    async execute(session: ProjectionSession): Promise<void> {

        session.metadata.scope.enterScope(this.scope)

        try {

            await this.tracker.stageStarted(this.scope,session)

            await this.middlewareChain.execute(
                this.middlewares,
                (middleware,next)=>middleware.execute(
                    session,next
                ),
                async ()=> this.executor.execute(session)
            )

            await this.tracker.stageCompleted(this.scope,session)
            
        } catch (error) {
            await this.tracker.stageFailed(this.scope,session,error)
            
        }finally{
            await session.metadata.scope.leaveScope()
        }
    }
    
}
