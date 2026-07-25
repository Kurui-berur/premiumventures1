import { FlowNode } from "src/graph/types/flow-node.type";

export interface ProjectionNodeSet {

    has(
        nodeId: string,
    ): boolean;

    node(
        nodeId: string,
    ): FlowNode | undefined;

    require(
        nodeId: string,
    ): FlowNode;

    nodeIds(): readonly string[];

    sceneIds(): readonly string[];

    sceneNodeIds(
        sceneId: string,
    ): readonly string[];

    ownerSceneId(
        nodeId: string,
    ): string | undefined;

}