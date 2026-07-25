import { FlowNode } from "src/graph/types/flow-node.type";
import { ProjectionNodeSet } from "../../contracts/nodes/projection-node-set.interface";
import { ProjectionNodeDescriptor } from "../../contracts/nodes/projection-node-descriptor.interface";

export class DefaultProjectionNodeSet
implements ProjectionNodeSet {

    private readonly orderedNodeIds:
        readonly string[];

    private readonly orderedSceneIds:
    readonly string[];    

    constructor(

        private readonly descriptor:
            ProjectionNodeDescriptor,

    ) {

        this.orderedNodeIds =
            Object.freeze([
                ...descriptor.nodeIds,
            ]);
         this.orderedSceneIds =

    Object.freeze([

        ...descriptor.sceneIndex.keys(),

    ]);   

    }

    has(
        nodeId: string,
    ): boolean {

        return this.descriptor
            .nodeIds
            .has(nodeId);

    }

    node(
        nodeId: string,
    ): FlowNode | undefined {

        if (!this.has(nodeId)) {

            return undefined;

        }

        return this.descriptor
            .candidateNodes
            .node(nodeId);

    }

    require(
    nodeId: string,
): FlowNode {

    const node =
        this.node(nodeId);

    if (!node) {

        throw new Error(

            `ProjectionNodeSet does not contain node '${nodeId}'.`,

        );

    }

    return node;

}

    nodeIds(): readonly string[] {

        return this.orderedNodeIds;

    }
    
    sceneIds(): readonly string[] {

    return this.orderedSceneIds;

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

        return this.descriptor
            .candidateNodes
            .ownerSceneId(nodeId);

    }

}