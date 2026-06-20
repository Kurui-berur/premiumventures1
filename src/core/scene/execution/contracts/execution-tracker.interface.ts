import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { SceneEvent }
from '../../../events/types/scene-event.type';

import { ExecutionFrame }
from './execution-frame.interface';



export interface ExecutionTracker {

  event(
    event: SceneEvent
  ): Promise<void>;

  frame(
    frame: ExecutionFrame
  ): Promise<void>;

  decision(
    frame: ExecutionFrame,
    decision: PluginDecision
  ): Promise<void>;

}