import { Inject, Injectable } from '@nestjs/common';
import { ExecutionCoordinator } from '../../contracts/execution-coordinator.interface';
import { DECISION_PATCH_EXECUTOR, EXECUTION_FRAME_FACTORY, EXECUTION_MIDDLEWARE, EXECUTION_TRACKER, PLUGIN_EXECUTOR } from '../../tokens/execution.tokens';
import type { ExecutionFrameFactory } from '../../contracts/execution-frame-factory.interface';
import type { ExecutionTracker } from '../../contracts/execution-tracker.interface';
import type { PluginExecutor } from '../../contracts/plugin-executor.interface';
import { ExecutionMiddleware } from '../../contracts/execution-middleware.interface';
import { ExecutionMiddlewarePipelineService } from '../../services/execution-middleware-pipeline/execution-middleware-pipeline.service';
import { SceneEvent } from 'src/core/events/types/scene-event.type';
import type { DecisionPatchExecutor } from '../../contracts/decision-patch-executor.interface';

@Injectable()
export class DefaultExecutionCoordinatorService implements ExecutionCoordinator{

    constructor(
        @Inject(EXECUTION_FRAME_FACTORY)
        private readonly frames:ExecutionFrameFactory,

        @Inject(EXECUTION_TRACKER)
        private readonly tracker:ExecutionTracker,

        @Inject(PLUGIN_EXECUTOR)
        private readonly executor:PluginExecutor,

        @Inject(EXECUTION_MIDDLEWARE)
        private readonly middlewares:readonly ExecutionMiddleware[],


        @Inject(DECISION_PATCH_EXECUTOR)
        private readonly patches:DecisionPatchExecutor,

        private readonly pipeline:ExecutionMiddlewarePipelineService,

    ){}
    
    async execute(event: SceneEvent): Promise<void> {
                
            await this.tracker.event(event);

            const frame =this.frames.create(event);

            await this.tracker.frame(frame);

            const decision = await this.pipeline.execute(
                this.middlewares,
                frame,async()=>{

                    return this.executor.execute(frame);

                    }

            );

            await this.patches.execute(frame,decision);
            
            await this.tracker.decision(frame,decision);

            }
    }

