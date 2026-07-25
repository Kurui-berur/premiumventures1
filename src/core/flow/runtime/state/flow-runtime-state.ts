import { NodeRuntimeState } from "./node-runtime-state";
import { SceneRuntimeState } from "./scene-runtime-state";

export interface FlowRuntimeState {

  currentSceneId: string ;

  activeNodeId: string | null;

  nodeStates: ReadonlyMap<string,NodeRuntimeState>;

  sceneStates:ReadonlyMap< string,SceneRuntimeState>;
}