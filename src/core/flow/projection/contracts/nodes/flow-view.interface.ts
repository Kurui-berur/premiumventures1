import { FlowNode } from "src/graph/types/flow-node.type";
import { FlowSceneView } from "./flow-scene-view.interface";

export interface FlowView {

    readonly rootSceneId: string;

    sceneIds():
        readonly string[];

    scene(
        sceneId: string,
    ): FlowSceneView | undefined;

    node(
        nodeId: string,
    ): FlowNode | undefined;

}