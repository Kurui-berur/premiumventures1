import { FlowRuntimeState }
from '../state/flow-runtime-state';

export interface RuntimeChangeDetector {

  changed(previous:FlowRuntimeState,

 current: FlowRuntimeState
 
): boolean;

}