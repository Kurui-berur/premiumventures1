import { CompiledNodeRef } from "./compiled-node-Ref.interfaces";
import { SceneTransition } from "./scene-transition.interface";


export interface CompiledScene {

  id: string;

  nodeIds: readonly string[];

  // FAST PATH (NEW)
  nodes: readonly CompiledNodeRef[];

  initialVisibilityIndex: ReadonlyMap<string, true>;

  initiallyVisibleNodeIds: readonly string[];

  transitions: readonly SceneTransition[];

  completionMode: 'ALL_COMPLETED' | 'ANY_COMPLETED';
}