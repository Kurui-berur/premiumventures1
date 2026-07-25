import { FlowNode } from 'src/graph/types/flow-node.type';

export interface ProjectionCandidateNodeSet {

    has(
        nodeId: string,
    ): boolean;

    node(
        nodeId: string,
    ): FlowNode | undefined;

    nodeIds(): readonly string[];

    sceneNodeIds(
        sceneId: string,
    ): readonly string[];

    ownerSceneId(
    nodeId: string,
): string | undefined;

}