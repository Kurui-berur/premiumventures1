import { Injectable } from '@nestjs/common';


import { ProjectionSession }
from '../../../context/projection-session.interface';


import { DefaultProjectionNodeDescriptor }
from '../../../descriptors/default-projection-node-descriptor/default-projection-node-descriptor.service';
import { ProjectionNodeDescriptorFactory } from '../../../contracts/factories/descriptor-factory/Projection-Node-Descriptor-Factory.interface';
import { ProjectionNodeDescriptor } from '../../../contracts/nodes/projection-node-descriptor.interface';

@Injectable()
export class DefaultProjectionNodeDescriptorFactoryService
implements ProjectionNodeDescriptorFactory {

    async create(

        session: ProjectionSession,

    ): Promise<ProjectionNodeDescriptor> {

        const candidateNodes =

            session.state
                .candidateNodes
                .require();

        const nodeIds =
            new Set<string>();

        const sceneIndex =
            new Map<
                string,
                string[]
            >();

        for (
            const nodeId
            of candidateNodes.nodeIds()
        ) {

            nodeIds.add(
                nodeId,
            );

            const sceneId =

                candidateNodes
                    .ownerSceneId(
                        nodeId,
                    );

            if (
                sceneId === undefined
            ) {

                continue;

            }

            let nodes =

                sceneIndex.get(
                    sceneId,
                );

            if (
                nodes === undefined
            ) {

                nodes = [];

                sceneIndex.set(

                    sceneId,

                    nodes,

                );

            }

            nodes.push(
                nodeId,
            );

        }

        return new DefaultProjectionNodeDescriptor(

            candidateNodes,

            nodeIds,

            sceneIndex,

        );

    }

}