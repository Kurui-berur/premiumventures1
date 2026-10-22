import { NodeRuntimeState } from "src/core/flow/runtime/state/node-runtime-state";
import { SceneRuntimeState } from "src/core/flow/runtime/state/scene-runtime-state";
import { SceneTransitionTrigger } from "src/graph/contracts/scene-transition-trigger.interface";

export interface DecisionResult {

  /**
   * Trigger produced by the decision engine.
   * Execution will use this to resolve the next transition.
   */
  readonly trigger: SceneTransitionTrigger;



}