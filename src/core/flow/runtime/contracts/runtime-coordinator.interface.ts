import {
  FlowRuntimeState
}
from '../state/flow-runtime-state';
import { FlowRuntimeStatePatch } from './runtime-state-patch.interface';


export interface RuntimeCoordinator {

  replace(

    flowId:
    string,

    state:
    FlowRuntimeState

  ): Promise<void>;

  patch(

    flowId:
    string,

    patch:
    FlowRuntimeStatePatch

  ): Promise<void>;

}