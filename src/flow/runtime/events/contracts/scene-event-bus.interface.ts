// src/engine/event/contracts/scene-event-bus.interface.ts

import { SceneEvent } from "../types/scene-event.type";



export interface SceneEventBus {

  /**
   * Publish an event.
   */
  dispatch(event: SceneEvent): Promise<void>;

  /**
   * Subscribe to events.
   */
  subscribe(
    handler: (event: SceneEvent) => Promise<void> | void
  ): void;
}