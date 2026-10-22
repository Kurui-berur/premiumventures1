import { Inject, Injectable } from '@nestjs/common';
import { ProjectionGraphResolver } from '../../contracts/resolvers/projection-graph-resolver.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import { PROJECTION_GRAPH_STRATEGY_REGISTRY } from '../../Tokens/registies/projection-registriess.tokens';
import type { ProjectionGraphStrategyRegistry } from '../../contracts/registries/projection-graph-strategy-registry.interface';
import { ProjectionGraph } from '../../contracts/graph/projection-graph.interface';

@Injectable()
export class DefaultProjectionGraphResolverService implements ProjectionGraphResolver{

    constructor(
        @Inject(PROJECTION_GRAPH_STRATEGY_REGISTRY)
        private readonly registry:ProjectionGraphStrategyRegistry
    ){}

    async resolve(session: ProjectionSession): Promise<ProjectionGraph> {

        const seed=session.state.requireSeed()

        const strategy=await this.registry.resolve(seed.scope)

        return await strategy.create(session)
        
    }
}
