import { Inject, Injectable } from '@nestjs/common';
import { ProjectionEngine } from '../../contracts/engine/projection-engine.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import { PROJECTION_GRAPH_PIPELINE, PROJECTION_SEED_PIPELINE } from '../../Tokens/pipelines/projection-pipelines.tokens';
import type { ProjectionSeedPipeline } from '../../contracts/pipelines/projection-seed-pipeline.interface';
import type { ProjectionGraphPipeline } from '../../contracts/pipelines/projection-graph-pipeline.interface';

@Injectable()
export class DefaultProjectionEngineService implements ProjectionEngine{

    constructor(

        @Inject(PROJECTION_SEED_PIPELINE)
        private readonly seed:ProjectionSeedPipeline,

        @Inject(PROJECTION_GRAPH_PIPELINE)
        private readonly graph:ProjectionGraphPipeline
    ){


    }

    async execute(session: ProjectionSession): Promise<void> {
        await this.seed.execute(session)

        await this.graph.execute(session)
    }
}

