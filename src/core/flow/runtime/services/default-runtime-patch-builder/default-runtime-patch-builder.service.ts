import { Injectable } from '@nestjs/common';
import { RuntimePatchBuilder } from '../../contracts/runtime-patch-bulder.interface';
import { FlowRuntimeStatePatch } from '../../contracts/runtime-state-patch.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';

@Injectable()
export class DefaultRuntimePatchBuilderService implements RuntimePatchBuilder{
    sceneTransition(
        current: FlowRuntimeState,
        
        next: FlowRuntimeState): FlowRuntimeStatePatch {

            const patch:FlowRuntimeStatePatch={}

            if(current.currentSceneId!==next.currentSceneId){

                patch.currentSceneId=next.currentSceneId

            }


            if(current.activeNodeId!==next.activeNodeId){
                patch.activeNodeId=next.activeNodeId
            }

            if(current.nodeStates!==next.nodeStates){
                patch.nodeStates=next.nodeStates
            }

            if (current.sceneStates!==next.sceneStates){
                patch.sceneStates=next.sceneStates
            }

           return patch
       
    }

    
}
