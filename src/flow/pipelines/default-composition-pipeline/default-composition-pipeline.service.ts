import { Inject, Injectable } from '@nestjs/common';
import { CompositionSession } from 'src/flow/context/session/composition-session.class';
import type { FlowSessionExecutor } from 'src/flow/contracts/executors/flow-session-executor.interface';
import { CompositionSessionPipeline } from 'src/flow/contracts/pipelines/composition-session-pipeline.interface';
import { FLOW_SESSION_EXECUTOR } from 'src/flow/tokens/executors/executors.tokens';

@Injectable()
export class DefaultCompositionPipelineService implements CompositionSessionPipeline{

    constructor(

        @Inject(FLOW_SESSION_EXECUTOR)

        private readonly flowSessionExecutor:FlowSessionExecutor,

    ) {}

    async execute(session: CompositionSession): Promise<void> {

                await this
            .flowSessionExecutor
            .execute(session);
       
    }
    
}
