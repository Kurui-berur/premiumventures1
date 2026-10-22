import { SceneTransitionTrigger } from "./scene-transition-trigger.interface";

export interface SceneTransition {

  sourceSceneId: string;

  targetSceneId: string;

  trigger: SceneTransitionTrigger;

  condition?: string | null;
}