import { NodeRuntimeState }
from '../state/node-runtime-state';

import { SceneRuntimeState }
from '../state/scene-runtime-state';

export interface FlowRuntimeStatePatch {

  currentSceneId?:
    string | null;

  activeNodeId?:
    string | null;

  nodeStates?:
    ReadonlyMap<
      string,
      NodeRuntimeState
    >;

  sceneStates?:
    ReadonlyMap<
      string,
      SceneRuntimeState
    >;

}