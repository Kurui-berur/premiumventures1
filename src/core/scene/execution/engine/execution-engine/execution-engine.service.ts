import { Inject, Injectable } from '@nestjs/common';

import { ExecutionEngine } from '../../contracts/engine/execution-engine.interface';

import { ExecutionSession } from '../../context/execution-session.class';

import type {
  ExecutionPipelineRunner,
} from '../../contracts/pipelines/execution-pipeline-runner.interface';

import {
  EXECUTION_PIPELINE_RUNNER,
} from '../../tokens/runners/runners.tokens';

@Injectable()
export class DefaultExecutionEngineService
implements ExecutionEngine {

  constructor(

    @Inject(EXECUTION_PIPELINE_RUNNER)
    private readonly pipelines: ExecutionPipelineRunner,

  ) {}

  async execute(
    session: ExecutionSession,
  ): Promise<void> {

    await this.pipelines.execute(
      session,
    );

  }

}