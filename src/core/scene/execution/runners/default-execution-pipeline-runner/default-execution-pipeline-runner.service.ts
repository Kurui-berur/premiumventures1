import { Inject, Injectable } from '@nestjs/common';
import { ExecutionPipelineRunner } from '../../contracts/pipelines/execution-pipeline-runner.interface';
import { ExecutionSession } from '../../context/execution-context.class';
import { ExecutionPipeline } from '../../contracts/pipelines/execution-pipeline.interface';
import { EXECUTION_PIPELINE } from '../../tokens/pipelines/pipelines.tokens';

@Injectable()
export class DefaultExecutionPipelineRunnerService implements ExecutionPipelineRunner{

        constructor(

        @Inject(EXECUTION_PIPELINE)

        private readonly pipelines:
            readonly ExecutionPipeline[]

    ) {}

    async execute(
        context: ExecutionSession
    ): Promise<void> {

        for (const pipeline of this.pipelines) {

            await pipeline.execute(
                context
            );

        }

    }

        
    }

