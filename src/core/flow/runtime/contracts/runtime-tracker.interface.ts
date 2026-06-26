import {
  FlowRuntimeState
}
from '../state/flow-runtime-state';
import { FlowRuntimeStatePatch} from './runtime-state-patch.interface';

export interface RuntimeTracker {

  replaced(
    flowId:string,

    state:FlowRuntimeState): Promise<void>;


    patched(
        flowId:string,

        patch:FlowRuntimeStatePatch
    )

}