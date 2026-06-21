import { FlowRuntimeState }
from '../../../flow/runtime/state/flow-runtime-state';

export interface SceneActivator {

activate(
    state:FlowRuntimeState,
    
    targetSceneId:string

): Promise<
FlowRuntimeState
>;

}