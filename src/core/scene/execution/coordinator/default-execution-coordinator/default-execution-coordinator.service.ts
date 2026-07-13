import { Inject, Injectable } from '@nestjs/common';

import {
  ExecutionCoordinator
} from '../../contracts/execution-coordinator.interface';

import {
  DECISION_PATCH_EXECUTOR,
  EXECUTION_DEDUPLICATOR,
  EXECUTION_FRAME_FACTORY,
  EXECUTION_MIDDLEWARE,
  EXECUTION_TRACKER,
  PLUGIN_EXECUTION_PIPELINE,
  TRANSITION_EXECUTOR
} from '../../tokens/execution.tokens';

import type {
  ExecutionFrameFactory
} from '../../contracts/execution-frame-factory.interface';

import type {
  ExecutionTracker
} from '../../contracts/execution-tracker.interface';

import type {
  ExecutionDeduplicator
} from '../../contracts/execution-deduplicator.interface';

import type {
  DecisionPatchExecutor
} from '../../contracts/decision-patch-executor.interface';

import type {
  TransitionExecutor
} from '../../contracts/transition-executor.interface';

import type {
  PluginExecutionPipeline
} from '../../contracts/plugin-pipeline.interface';

import {
  ExecutionMiddleware
} from '../../contracts/execution-middleware.interface';

import {
  ExecutionMiddlewarePipelineService
} from '../../services/execution-middleware-pipeline/execution-middleware-pipeline.service';

import {
  SceneEvent
} from 'src/core/events/types/scene-event.type';

import {
  RUNTIME_COORDINATOR
} from 'src/core/flow/runtime/tokens/runtime-tokens';

import type {
  RuntimeCoordinator
} from 'src/core/flow/runtime/contracts/runtime-coordinator.interface';

import {
  ExecutionContext
} from '../../context/execution-context.class';
import { RUNTIME_PIPELINE } from '../../tokens/pipelines/pipelines.tokens';

@Injectable()
export class DefaultExecutionCoordinatorService
implements ExecutionCoordinator {

  constructor(

    @Inject(
      EXECUTION_FRAME_FACTORY
    )
    private readonly frames:
      ExecutionFrameFactory,

    @Inject(
      EXECUTION_TRACKER
    )
    private readonly tracker:
      ExecutionTracker,

    @Inject(
      PLUGIN_EXECUTION_PIPELINE
    )
    private readonly plugins:
      PluginExecutionPipeline,

    @Inject(
      EXECUTION_DEDUPLICATOR
    )
    private readonly deduplicator:
      ExecutionDeduplicator,

    @Inject(
      EXECUTION_MIDDLEWARE
    )
    private readonly middlewares:
      readonly ExecutionMiddleware[],

    @Inject(
      DECISION_PATCH_EXECUTOR
    )
    private readonly patches:
      DecisionPatchExecutor,

    @Inject(
      TRANSITION_EXECUTOR
    )
    private readonly transitions:
      TransitionExecutor,

    @Inject(
      RUNTIME_PIPELINE
    )
    private readonly runtime:
      RuntimeCoordinator,

    private readonly pipeline:
      ExecutionMiddlewarePipelineService

  ) {}

  async execute(
    event: SceneEvent
  ): Promise<void> {

    await this.tracker.event(
      event
    );

    const frame =this.frames.create(event);

    if (
      await this.deduplicator.exists(
        frame.executionId
      )
    ) {
      return;
    }

    await this.tracker.frame(
      frame
    );

    const context =
      new ExecutionContext(
        frame
      );

    await this.pipeline.execute(

      this.middlewares,

      context,

      async () => {

        await this.plugins.execute(
          context
        );

      }

    );

    await this.tracker.decision(
      context
    );

    await this.patches.execute(
      context
    );

    const mutation =
      context.state.getRuntimeMutation();

    if (mutation) {

      await this.runtime.apply(

        context.frame.flowInstanceId,

        mutation

      );

    }

    // Transition pipeline has not yet been migrated.
    // Leave this unchanged until the next phase.

    const transition =

      await this.transitions.execute(

        context.frame,

        context.state.requireDecision()

      );

    if (transition) {

      await this.runtime.apply(

        context.frame.flowInstanceId,

        transition

      );

    }

    await this.deduplicator.mark(

      context.frame.executionId

    );

  }

}