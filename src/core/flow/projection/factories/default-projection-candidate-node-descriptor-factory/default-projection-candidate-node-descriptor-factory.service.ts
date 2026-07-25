import { Injectable } from '@nestjs/common';
import { ProjectionCandidateNodeDescriptor } from '../../contracts/descriptors/projection-candidate-node-descriptor.interface';
import { ProjectionCandidateNodeDescriptorFactory } from '../../contracts/factories/projection-candidate-node-descriptor-factory.interface';
import { ProjectionGraph } from '../../contracts/graph/projection-graph.interface';

@Injectable()
export class DefaultProjectionCandidateNodeDescriptorFactoryService implements
 ProjectionCandidateNodeDescriptorFactory {

    async create(

        graph: ProjectionGraph,

    ): Promise<ProjectionCandidateNodeDescriptor> {

       const nodeIds =
            new Set<string>();

        const sceneIndex =
            new Map<
                string,
                readonly string[]
            >();

        for (
            const sceneId of graph.sceneIds()
        ) {

            const nodes =
                graph.sceneNodeIds(sceneId);

            sceneIndex.set(
                sceneId,
                nodes,
            );

            for (
                const nodeId of nodes
            ) {

                nodeIds.add(nodeId);

            }

        }

        return {

            projectionGraph: graph,

            nodeIds,

            sceneIndex,

        };

    }
}