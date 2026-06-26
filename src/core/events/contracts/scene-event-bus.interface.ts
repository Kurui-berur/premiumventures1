// src/engine/event/contracts/scene-event-bus.interface.ts

import { SceneEvent } from "../types/scene-event.type";



export interface SceneEventBus {

  /**
   * something happens tell interested parties
   */
  dispatch(event: SceneEvent): Promise<void>;

  /**
   * when events happens call me
   */
  subscribe(
    handler: (event: SceneEvent) => Promise<void> | void
  ): void;
}