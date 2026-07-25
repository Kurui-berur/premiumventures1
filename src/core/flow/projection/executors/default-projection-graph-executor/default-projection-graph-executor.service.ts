import { Inject, Injectable } from '@nestjs/common';
import { ProjectionGraphExecutor } from '../../contracts/executors/projection-graph-executor.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import { PROJECTION_GRAPH_RESOLVER } from '../../Tokens/resolvers/projection-resolvers.tokens';
import type { ProjectionGraphResolver } from '../../contracts/resolvers/projection-graph-resolver.interface';

@Injectable()
export class DefaultProjectionGraphExecutorService implements ProjectionGraphExecutor{

    constructor(
        @Inject(PROJECTION_GRAPH_RESOLVER)
        private readonly resolver:ProjectionGraphResolver
    ){

    }
    async execute(session: ProjectionSession): Promise<void> {

        const projectionGraph=await this.resolver.resolve(session)

        session.state.setProjectionGraph(projectionGraph)


    }
}
