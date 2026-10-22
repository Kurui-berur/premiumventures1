import { Inject, Injectable } from '@nestjs/common';
import { ProjectionCoordinator } from '../../contracts/coordinator/projection-coordinator.interface';
import { ProjectionRequest } from '../../context/contracts/initialization/projection-request.interface';
import { FlowView } from '../../contracts/nodes/flow-view.interface';
import type { ProjectionInitializationPipeline } from '../../context/contracts/pipelines/projection-initialization-pipeline.interface';
import type { ProjectionEngine } from '../../contracts/engine/projection-engine.interface';
import { PROJECTION_INITIALIZATION_PIPELINE } from '../../Tokens/pipelines/projection-pipelines.tokens';
import { PROJECTION_ENGINE } from '../../Tokens/engines/projection-engines.tokens';

@Injectable()
export class DefaultProjectionCoordinatorService implements ProjectionCoordinator{
    constructor(

        @Inject(PROJECTION_INITIALIZATION_PIPELINE)
        private readonly initialization:
            ProjectionInitializationPipeline,

        @Inject(PROJECTION_ENGINE)
        private readonly engine:ProjectionEngine,

    ) {}

    async project(
        request: ProjectionRequest,
    ): Promise<FlowView> {

        const session =

            await this.initialization.initialize(
                request,
            );

        await this.engine.execute(
            session,
        );

        return session.state.flowView.require()

    }
}
