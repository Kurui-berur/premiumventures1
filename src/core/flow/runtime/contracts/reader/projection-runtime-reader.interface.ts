import { NodeRuntimeState } from "../../state/node-runtime-state";
import { SceneRuntimeState } from "../../state/scene-runtime-state";


export interface ProjectionRuntimeReader {

  currentSceneId(): string;

  activeNodeId(): string | null;

  nodeState(
    nodeId: string
  ): NodeRuntimeState | undefined;

  sceneState(
    sceneId: string
  ): SceneRuntimeState | undefined;

}