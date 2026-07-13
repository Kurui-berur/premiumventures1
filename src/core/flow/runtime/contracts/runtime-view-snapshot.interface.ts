import { FlowRuntimeState }
from '../state/flow-runtime-state';

export interface RuntimeViewSnapshot {

  flowId: string;

  state: Readonly<FlowRuntimeState>;

  timestamp: number;

}