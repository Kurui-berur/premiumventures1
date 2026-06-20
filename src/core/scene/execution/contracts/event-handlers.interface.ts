import { SceneEvent } from "src/core/events/types/scene-event.type";


export interface EventHandler {

  handle(
    event: SceneEvent
  ): Promise<void>;

}