import { Inject, Injectable } from '@nestjs/common';
import { FlowViewPipeline } from '../../contracts/pipelines/flow-view-pipeline.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import type { MiddlewareChain } from 'src/core/scene/execution/contracts/middlewares/middleware-chain.interface';
import { MIDDLEWARE_CHAIN } from 'src/core/scene/execution/tokens/execution.tokens';
import type { FlowViewExecutor } from '../../contracts/executors/flow-view-executor.interface';
import { ProjectionMiddleware } from '../../contracts/middlewares/projection-middleware.interface';
import type { ProjectionTracker } from '../../contracts/tracker/projection-tracker.interface';
import { PROJECTION_MIDDLEWARE } from '../../Tokens/middlewares/projection-middleware.interface';
import { PROJECTION_TRACKER } from '../../Tokens/tracker/projection-tracker.tokens';
import { ProjectionScope } from '../../types/projection-scope.types';
import { FLOW_VIEW_EXECUTOR } from '../../Tokens/executors/executors.tokens';

@Injectable()
export class DefaultFlowViewPipelineService implements FlowViewPipeline {
    constructor(
           @Inject(FLOW_VIEW_EXECUTOR)
           private readonly executor:FlowViewExecutor,
   
           @Inject(PROJECTION_TRACKER)
           private readonly tracker:ProjectionTracker,
   
           @Inject(MIDDLEWARE_CHAIN)
           private readonly middlewareChain:MiddlewareChain,
   
           @Inject(PROJECTION_MIDDLEWARE)
           private readonly middlewares:readonly ProjectionMiddleware[]
       ){}
      
       readonly scope: ProjectionScope=ProjectionScope.FLOW_VIEW
   
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
                   
               } catch (error) {
                   await this.tracker.stageFailed(this.scope,session,error)
                   
               }finally{
                   session.metadata.scope.leaveScope()
               }
   
   
       }
   }
   
