import { TriggerType } from "../types/scene-transition-trigger.types";

export interface SceneTransitionTrigger {

    readonly type: TriggerType;

    readonly value?: string;

}