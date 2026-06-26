import { Injectable } from '@nestjs/common';
import { RuntimePatchBuilder } from '../../contracts/runtime-patch-bulder.interface';
import { FlowRuntimeStatePatch } from '../../contracts/runtime-state-patch.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';

@Injectable()
export class DefaultRuntimePatchBuilderService implements RuntimePatchBuilder{
    sceneTransition(
        current: FlowRuntimeState,
        
        next: FlowRuntimeState): FlowRuntimeStatePatch {

           return {
            currentSceneId:next.currentSceneId,

            activeNodeId:next.activeNodeId,

            nodeStates:next.nodeStates,

            sceneStates:next.sceneStates
           }
       
    }

    
}
