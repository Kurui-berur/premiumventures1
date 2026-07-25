import { Injectable } from '@nestjs/common';
import { FlowViewFactory } from '../../contracts/factories/flow-view/flow-view-factory.interface';
import { FlowViewDescriptor } from '../../contracts/descriptors/flow-view-descriptor.interface';
import { FlowView } from '../../contracts/nodes/flow-view.interface';
import { FlowNode } from 'src/graph/types/flow-node.type';
import { ProjectionNodeSet } from '../../contracts/nodes/projection-node-set.interface';
import { DefaultFlowView } from '../../nodes/default-flow-view/default-flow-view.service';
import { FlowSceneView } from '../../contracts/nodes/flow-scene-view.interface';
import { DefaultSceneView } from '../../nodes/default-scene-view/default-scene-view.service';

@Injectable()
export class DefaultFlowViewFactoryService  implements FlowViewFactory {
    async create(descriptor: FlowViewDescriptor): Promise<FlowView> {
         const projectionNodes =

        descriptor
            .projectionNodes;

    const nodes =

        this.buildNodes(

            projectionNodes,

        );

    const scenes =

        this.buildScenes(

            projectionNodes,

        );

    return new DefaultFlowView(

    descriptor
        .rootSceneId,

    projectionNodes
        .sceneIds(),

    scenes,

    nodes,

);

    }
    private buildNodes(

    projectionNodes:
        ProjectionNodeSet,

): Readonly<Record<
    string,
    FlowNode
>> {

    const nodes:
        Record<
            string,
            FlowNode
        > = {};

    for (

        const nodeId

        of projectionNodes
            .nodeIds()

    ) {

        nodes[nodeId] =

            projectionNodes
                .require(nodeId);

    }

    return Object.freeze(
        nodes,
    );

}

private buildScenes(

    projectionNodes:
        ProjectionNodeSet,

): Readonly<Record<
    string,
    FlowSceneView
>> {

    const scenes:
        Record<
            string,
            FlowSceneView
        > = {};

    for (

        const sceneId

        of projectionNodes
            .sceneIds()

    ) {

        scenes[sceneId] =

            new DefaultSceneView(

                sceneId,

                projectionNodes
                    .sceneNodeIds(sceneId),

            );

    }

    return Object.freeze(
        scenes,
    );

}


}
