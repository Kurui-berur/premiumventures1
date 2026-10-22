import { Inject, Injectable } from '@nestjs/common';
import { ExecutionInitializationPipeline } from '../../contracts/initialization/execution-initialization-pipeline.interface';
import { ExecutionRequest } from '../../contracts/execution-request.interface';
import { ExecutionSession } from '../../execution-session.class';
import { EXECUTION_FRAME_FACTORY } from '../../../tokens/execution.tokens';
import { EXECUTION_RESOURCE_FACTORY, EXECUTION_SESSION_FACTORY } from '../../../tokens/factories/execution-factories.tokens';
import type { ExecutionSessionFactory } from '../../factory_contracts/execution-session-factory';
import type { ExecutionFrameFactory } from '../../factory_contracts/execution-frame-factory.interface';
import type { ExecutionResourceFactory } from '../../factory_contracts/execution-resource-factory.interface';

@Injectable()
export class ExecutionInitializationPipelineService implements ExecutionInitializationPipeline {
     constructor(

        @Inject(EXECUTION_RESOURCE_FACTORY)
        private readonly resources:
            ExecutionResourceFactory,

        @Inject(EXECUTION_FRAME_FACTORY)
        private readonly frames:
            ExecutionFrameFactory,

        @Inject(EXECUTION_SESSION_FACTORY)
        private readonly sessions:
            ExecutionSessionFactory,

    ) {}

    async initialize(request: ExecutionRequest): Promise<ExecutionSession> {

        const resources=await this.resources.create(request.graphVersion,request.flowInstanceId)

        const frame=await this.frames.create(request,resources)

        return this.sessions.create(frame)
    }
}
