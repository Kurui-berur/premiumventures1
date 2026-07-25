import { FlowNode } from "src/graph/types/flow-node.type";
import { FlowSceneView } from "./flow-scene-view.interface";

export interface FlowView {

    readonly rootSceneId: string;

    readonly sceneIds:
        readonly string[];

    readonly scenes:
        Readonly<Record<
            string,
            FlowSceneView
        >>;

    readonly nodes:
        Readonly<Record<
            string,
            FlowNode
        >>;

}