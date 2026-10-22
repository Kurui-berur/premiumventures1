import { Inject, Injectable } from '@nestjs/common';
import { ProjectionInitializationPipeline } from '../../contracts/pipelines/projection-initialization-pipeline.interface';
import { ProjectionRequest } from '../../contracts/initialization/projection-request.interface';
import { ProjectionSession } from '../../projection-session.interface';
import type { ProjectionFrameFactory } from '../../factory_contracts/projection-frame-factory.interface';
import type { ProjectionMetadataFactory } from '../../factory_contracts/projection-metadata-factory.interface';
import type { ProjectionSessionFactory } from '../../factory_contracts/projection-session-factory.interface';
import type { ProjectionStateFactory } from '../../factory_contracts/projection-state-factory.interface';
import { PROJECTION_FRAME_FACTORY, PROJECTION_METADATA_FACTORY, PROJECTION_SESSION_FACTORY, PROJECTION_STATE_FACTORY } from '../../../Tokens/factories/projection-factories.tokens';

@Injectable()
export class ProjectionInitializationPipelineService implements
 ProjectionInitializationPipeline{

    constructor(

         @Inject(PROJECTION_FRAME_FACTORY)
        private readonly frames: ProjectionFrameFactory,

        @Inject(PROJECTION_METADATA_FACTORY)
        private readonly metadata: ProjectionMetadataFactory,

        @Inject(PROJECTION_STATE_FACTORY)
        private readonly states: ProjectionStateFactory,

        @Inject(PROJECTION_SESSION_FACTORY)
        private readonly sessions: ProjectionSessionFactory,
        
    ){}
    async initialize(request: ProjectionRequest): Promise<ProjectionSession> {
        
    const frame=this.frames.create(request)

    const metadata=await this.metadata.create()

    const state=await this.states.create()

    return this.sessions.create(
        frame,
        metadata,
        state
    )

    }
}
