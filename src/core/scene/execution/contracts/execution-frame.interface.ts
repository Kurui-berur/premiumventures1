

import { SceneEvent } from 'src/core/events/types/scene-event.type';
import { FlowRuntimeState }
from '../../../flow/runtime/state/flow-runtime-state';
import { ExecutionMode } from '../types/execution-mode.types';
import { ProjectionRuntimeReader } from 'src/core/flow/runtime/contracts/reader/projection-runtime-reader.interface';
import { GraphReader } from 'src/graph/graph-core/contracts/graph-reader.interface';

export interface ExecutionFrame {

  executionId: string;

  flowId: string;
    
  flowInstanceId:string;

  graph:GraphReader;

  event: SceneEvent;

  runtime:ProjectionRuntimeReader //runtime as found on initial request 

  mode:ExecutionMode;

  timestamp: number;

}