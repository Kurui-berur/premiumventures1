import { Inject, Injectable } from '@nestjs/common';

import { ProjectionEngine } from '../../contracts/engine/projection-engine.interface';

import { ProjectionSession } from '../../context/projection-session.interface';
import type { FlowViewPipeline } from '../../contracts/pipelines/flow-view-pipeline.interface';
import type { ProjectionCandidateNodePipeline } from '../../contracts/pipelines/projection-candidate-node-pipeline.interface';
import type { ProjectionGraphPipeline } from '../../contracts/pipelines/projection-graph-pipeline.interface';
import type { ProjectionNodePipeline } from '../../contracts/pipelines/projection-node-pipeline.interface';
import type { ProjectionSeedPipeline } from '../../contracts/pipelines/projection-seed-pipeline.interface';
import { PROJECTION_SEED_PIPELINE, PROJECTION_GRAPH_PIPELINE, FLOW_VIEW_PIPELINE, PROJECTION_CANDIDATE_NODE_PIPELINE, PROJECTION_NODE_PIPELINE } from '../../Tokens/pipelines/projection-pipelines.tokens';


@Injectable()
export class DefaultProjectionEngineService
implements ProjectionEngine {

    constructor(

        @Inject(PROJECTION_SEED_PIPELINE)
        private readonly seed:
            ProjectionSeedPipeline,

        @Inject(PROJECTION_CANDIDATE_NODE_PIPELINE)
        private readonly candidate:
            ProjectionCandidateNodePipeline,

        @Inject(PROJECTION_NODE_PIPELINE)
        private readonly node:
            ProjectionNodePipeline,

        @Inject(PROJECTION_GRAPH_PIPELINE)
        private readonly graph:
            ProjectionGraphPipeline,

        @Inject(FLOW_VIEW_PIPELINE)
        private readonly flowView:
            FlowViewPipeline,

    ) {}

    async execute(
        session: ProjectionSession,
    ): Promise<void> {

        await this.seed.execute(session);

        await this.candidate.execute(session);

        await this.node.execute(session);

        await this.graph.execute(session);

        await this.flowView.execute(session);

    }

}