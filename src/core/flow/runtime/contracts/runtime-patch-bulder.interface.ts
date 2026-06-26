import { FlowRuntimeState }
from '../state/flow-runtime-state';
import { FlowRuntimeStatePatch } from './runtime-state-patch.interface';



export interface RuntimePatchBuilder {

  sceneTransition(
    current:
    FlowRuntimeState,

    next:
    FlowRuntimeState

  ): FlowRuntimeStatePatch;

}