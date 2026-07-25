import { FlowRuntimeState }
from '../state/flow-runtime-state';

export interface RuntimeStateReader {

  state():
  Readonly<
    FlowRuntimeState
  >;


}