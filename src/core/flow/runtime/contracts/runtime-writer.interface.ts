import { FlowRuntimeState }
from '../state/flow-runtime-state';
import { FlowRuntimeStatePatch } from './runtime-state-patch.interface';

export interface RuntimeWriter {

  update(
    state:
    FlowRuntimeState
  ): Promise<void>;

  updatePatch(patch:FlowRuntimeStatePatch)

}