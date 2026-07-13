import { FlowRuntimeState }
from '../state/flow-runtime-state';

export interface RuntimeSnapshotReader {

  snapshot():
  Readonly<
    FlowRuntimeState
  >;

}