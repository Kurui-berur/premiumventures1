

import { SceneEvent } from 'src/core/events/types/scene-event.type';
import { FlowRuntimeState }
from '../../../flow/runtime/state/flow-runtime-state';
import { ExecutionMode } from '../types/execution-mode.types';

export interface ExecutionFrame {

  executionId: string;

  flowId: string;

  event: SceneEvent;

  state: Readonly<FlowRuntimeState>;

  guards:
    Readonly<
      Record<string, unknown>
    >;

    mode:ExecutionMode;

  timestamp: number;

}