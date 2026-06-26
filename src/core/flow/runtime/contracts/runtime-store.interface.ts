import { FlowRuntimeState }
from '../state/flow-runtime-state';
import { FlowRuntimeStatePatch } from './runtime-state-patch.interface';

export interface RuntimeStore {

  state():
  Readonly<
    FlowRuntimeState
  >;

  replace(
    state:
    FlowRuntimeState
  ): Promise<void>;

  patch(
    patch:FlowRuntimeStatePatch
  )

}