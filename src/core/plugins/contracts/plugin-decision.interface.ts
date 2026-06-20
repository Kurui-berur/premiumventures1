import { NodeRuntimeState } from "src/core/flow/runtime/state/node-runtime-state";
import { SceneRuntimeState } from "src/core/flow/runtime/state/scene-runtime-state";
import { SceneTransition } from "src/graph/contracts/scene-transition.interface";

export interface PluginDecision {

  /**
   * Node-level mutations
   */
  nodeStatePatch?: Map<string, Partial<NodeRuntimeState>>;

  /**
   * Scene-level mutations
   */
  sceneStatePatch?: Map<string, Partial<SceneRuntimeState>>;

  /**
   * Flow navigation intent (NOT execution)
   */
  transitions?: SceneTransition[];

  /**
   * Domain-level completion signals
   */
  completedNodes?: string[];
}