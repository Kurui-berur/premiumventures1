import { FlowRuntimeState }
from '../state/flow-runtime-state';

export interface RuntimeReader {

  state():
  Readonly<
    FlowRuntimeState
  >;


}