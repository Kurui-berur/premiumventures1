import { SceneTransition } from "src/graph/contracts/scene-transition.interface";

///base event 
export interface BaseSceneEvent {
  id: string;
  timestamp?: number;
}


// ======================================================
// ROOT EVENT UNION (ENGINE ONLY UNDERSTANDS THESE)
// ======================================================

export type SceneEvent =
  | NodeLifecycleEvent
  | SceneLifecycleEvent
  | InteractionEvent
  | TransitionEvent;


// ======================================================
// 1. NODE LIFECYCLE EVENTS (ENGINE INTERNAL STATE FLOW)
// ======================================================

export interface NodeLifecycleEvent extends BaseSceneEvent {

  type:
    | 'NODE_ENTERED'
    | 'NODE_EXITED'
    | 'NODE_COMPLETED';

  nodeId: string;
}


// ======================================================
// 2. SCENE LIFECYCLE EVENTS (SCENE STATE MANAGEMENT)
// ======================================================

export interface SceneLifecycleEvent extends BaseSceneEvent {
  type:| 'SCENE_INITIALIZED' | 'SCENE_COMPLETED';

  sceneId: string;

  // 👇 ADD THIS
  nodeIds?: string[];
}


// ======================================================
// 3. GENERIC USER INTERACTION EVENT
// ======================================================
// IMPORTANT:
// This replaces ALL domain-specific events like:
// - AnswerSubmitted
// - InputChanged
// - ButtonClicked
// The engine does NOT interpret meaning here.

export interface InteractionEvent extends BaseSceneEvent {

  type: 'NODE_INTERACTED';

  nodeId: string;

  payload?: unknown;
}


// ======================================================
// 4. SCENE TRANSITION EVENT (FLOW CONTROL)
// ======================================================


export interface TransitionEvent extends BaseSceneEvent {

  type: 'SCENE_TRANSITION';

  payload: SceneTransition;
}