

import { SceneEvent } from 'src/core/events/types/scene-event.type';
import { ExecutionSession } from '../context/execution-context.class';


export interface ExecutionFrameFactory {

  create(
    event: SceneEvent
  ): ExecutionSession;

}