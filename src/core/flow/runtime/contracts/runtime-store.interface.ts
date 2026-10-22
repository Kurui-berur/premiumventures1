import { FlowRuntimeState }
from '../state/flow-runtime-state';
import { FlowRuntimeStatePatch } from './runtime-state-patch.interface';
import { RuntimeStateReader } from './runtime-state-reader.interface';

export interface RuntimeStore extends RuntimeStateReader{

  replace(
    state:
    FlowRuntimeState
  ): Promise<void>;

  patch(
    patch:FlowRuntimeStatePatch
  )

}