import { Inject, Injectable } from '@nestjs/common';

import { ExecutionCoordinator }
from '../../contracts/coordinator/execution-coordinator.interface';

import { ExecutionRequest }
from '../../context/contracts/execution-request.interface';

import { ExecutionSession }
from '../../context/execution-session.class';

import {
    EXECUTION_DEDUPLICATOR,
} from '../../tokens/execution.tokens';
import type { ExecutionInitializationPipeline } from '../../context/contracts/initialization/execution-initialization-pipeline.interface';
import type { ExecutionEngine } from '../../contracts/engine/execution-engine.interface';
import type { ExecutionDeduplicator } from '../../contracts/execution-deduplicator.interface';
import { EXECUTION_ENGINE } from '../../tokens/engines/execution-engine.tokens';
import { EXECUTION_INITIALIZATION_PIPELINE } from '../../tokens/pipelines/pipelines.tokens';

@Injectable()
export class DefaultExecutionCoordinatorService
implements ExecutionCoordinator {

    constructor(

        @Inject(EXECUTION_DEDUPLICATOR)
        private readonly deduplicator:
            ExecutionDeduplicator,

        @Inject(EXECUTION_INITIALIZATION_PIPELINE)
        private readonly initialization:
            ExecutionInitializationPipeline,

        @Inject(EXECUTION_ENGINE)
        private readonly engine:
            ExecutionEngine,

    ) {}

    async execute(
        request: ExecutionRequest,
    ): Promise<ExecutionSession> {

        if (
            await this.deduplicator.exists(
                request.executionId,
            )
        ) {

            throw new Error(
                `Execution '${request.executionId}' has already been processed.`,
            );

        }

        const session =

            await this.initialization.initialize(
                request,
            );

        await this.engine.execute(
            session,
        );

        await this.deduplicator.mark(
            request.executionId,
        );

        return session;

    }

}