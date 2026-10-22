

import { SceneEvent } from 'src/core/events/types/scene-event.type';
import { ExecutionSession } from '../context/execution-session.class';
import { ExecutionFrame } from './execution-frame.interface';


export interface ExecutionFrameFactory {

  create(
    event: SceneEvent
  ): ExecutionFrame;

}