import {
  FlowRuntimeState
}
from '../state/flow-runtime-state';
import { RuntimeMutation } from '../types/runtime-mutation.type';
import { FlowRuntimeStatePatch } from './runtime-state-patch.interface';


export interface RuntimeCoordinator {

 apply(

flowInstanceId:string,

mutation:RuntimeMutation

): Promise<void>;

}