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

import { RUNTIME_PIPELINE } from '../../tokens/pipelines/pipelines.tokens';
import { EXECUTION_PIPELINE_RUNNER } from '../../tokens/runners/runners.tokens';
import type { ExecutionPipelineRunner } from '../../contracts/pipelines/execution-pipeline-runner.interface';
import { EXECUTION_SESSION_FACTORY } from '../../tokens/factories/execution-factories.tokens';
import type { ExecutionSessionFactory } from '../../context/factory/execution-session-factory';

@Injectable()
export class DefaultExecutionCoordinatorService
implements ExecutionCoordinator {

  constructor(

    @Inject(EXECUTION_FRAME_FACTORY)
    private readonly frames: ExecutionFrameFactory,

    @Inject(EXECUTION_TRACKER)
    private readonly tracker: ExecutionTracker,

    @Inject(EXECUTION_DEDUPLICATOR)
    private readonly deduplicator: ExecutionDeduplicator,

    @Inject(EXECUTION_SESSION_FACTORY)
    private readonly sessions: ExecutionSessionFactory,

    @Inject(EXECUTION_PIPELINE_RUNNER)
    private readonly pipelines: ExecutionPipelineRunner

  ) {}

  async execute(
    event: SceneEvent
  ): Promise<void> {

     await this.tracker.event(event);

    const frame =this.frames.create(event);

    if (
      await this.deduplicator.exists(
        frame.executionId
      )
    ) {
      return;
    }

    await this.tracker.frame(frame);

    const session = this.sessions.create(frame);

    await this.tracker.session(session)

    await this.pipelines.execute(
      session
    );

    await this.deduplicator.mark(
      frame.executionId
    );

  }

}