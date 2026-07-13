import { SceneEvent } from "src/core/events/types/scene-event.type";

export interface ExecutionPort {

 execute(
   flowId: string,
   event: SceneEvent
 ): Promise<void>;

}