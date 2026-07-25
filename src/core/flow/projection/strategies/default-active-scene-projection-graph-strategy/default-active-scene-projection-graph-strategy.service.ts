import { Inject, Injectable } from '@nestjs/common';
import { ProjectionGraphStrategy } from '../../contracts/strategies/projection-graph-strategy.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import { ProjectionScope } from '../../types/projection-scope.types';
import { DefaultProjectionGraphService } from '../../graph/default-projection-graph/default-projection-graph.service';
import { ProjectionGraphDescriptor } from '../../contracts/descriptors/projectiongraphdescriptor.interface';
import { ProjectionGraph } from '../../contracts/graph/projection-graph.interface';
import { DefaultProjectionGraphFactoryService } from '../../factories/default-projection-graph-factory/default-projection-graph-factory.service';
import { PROJECTION_GRAPH_FACTORY } from '../../Tokens/factories/projection-factories.tokens';
import type { ProjectionGraphFactory } from '../../contracts/factories/projection-graph-factory.interface';

@Injectable()
export class DefaultActiveSceneProjectionGraphStrategyService implements ProjectionGraphStrategy {
    readonly scope: ProjectionScope=ProjectionScope.ACTIVE_SCENE;
    constructor(
        @Inject(PROJECTION_GRAPH_FACTORY)
        private readonly factory:ProjectionGraphFactory

    ){}

    async create(session: ProjectionSession): Promise<ProjectionGraph> {

        const seed=session.state.requireSeed()

        const sceneId=seed.anchor.id!

        const graph=session.frame.graph

        if(!graph.hasScene(sceneId)){
             throw new Error(
                `Scene '${sceneId}' does not exist in the graph.`,
            );
        }
        const descriptor:ProjectionGraphDescriptor={
            rootSceneId:sceneId,
            sceneIds:[sceneId,]
        }
     return this.factory.create(session,descriptor)

    }
}
