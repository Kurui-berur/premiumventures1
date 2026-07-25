import { FlowNode } from 'src/graph/types/flow-node.type';
import { ProjectionCandidateNodeDescriptor } from '../../contracts/descriptors/projection-candidate-node-descriptor.interface';
import { ProjectionCandidateNodeSet } from '../../contracts/nodes/ProjectionCandidateNodeSet.interface';

export class DefaultProjectionCandidateNodeSet
implements ProjectionCandidateNodeSet {

    private readonly orderedNodeIds: readonly string[];

    constructor(

        private readonly descriptor: ProjectionCandidateNodeDescriptor,

    ) {

        this.orderedNodeIds = Object.freeze([
            ...descriptor.nodeIds,
        ]);

    }

    has(
        nodeId: string,
    ): boolean {

        return this.descriptor.nodeIds.has(nodeId);

    }

    node(
        nodeId: string,
    ): FlowNode | undefined {

        if (!this.has(nodeId)) {

            return undefined;



        }

        return this.descriptor.projectionGraph.node(nodeId);


    }

    nodeIds(): readonly string[] {

        return this.orderedNodeIds;

    }

    sceneNodeIds(
        sceneId: string,
    ): readonly string[] {

        return this.descriptor
            .sceneIndex
            .get(sceneId)
            ?? [];

    }

    ownerSceneId(
    nodeId: string,
): string | undefined {

    if (!this.has(nodeId)) {
        return undefined;
    }

    return this.descriptor.projectionGraph.ownerSceneId(nodeId);

}

}