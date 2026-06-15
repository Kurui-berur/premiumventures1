import { SceneTransitionTrigger } from "../types/scene-transition-trigger.types";

export interface SceneTransition {

  sourceSceneId: string;

  targetSceneId: string;

  trigger: SceneTransitionTrigger;

  condition?: string | null;
}