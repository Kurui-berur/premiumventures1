import { FlowRuntimeState }
from '../state/flow-runtime-state';

export interface RuntimeWriter {

  update(
    state:
    FlowRuntimeState
  ): Promise<void>;

}