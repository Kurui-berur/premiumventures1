import { SceneEvent }
from 'src/core/events/types/scene-event.type';

export interface ExecutionIdGenerator {

  generate(
    event:
    SceneEvent
  ): string;

}