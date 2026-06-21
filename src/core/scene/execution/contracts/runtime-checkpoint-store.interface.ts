import { FlowRuntimeState }
from '../../../flow/runtime/state/flow-runtime-state';

export interface RuntimeCheckpointStore {

save(
state: FlowRuntimeState
): Promise<void>;

latest():Promise<FlowRuntimeState |null>;

}