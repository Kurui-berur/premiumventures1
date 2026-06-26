import { Injectable } from '@nestjs/common';
import { RuntimeStore } from '../../contracts/runtime-store.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import { NodeRuntimeState } from '../../state/node-runtime-state';
import { SceneRuntimeState } from '../../state/scene-runtime-state';
import { FlowRuntimeStatePatch} from '../../contracts/runtime-state-patch.interface';

@Injectable()
export class InMemoryFlowRuntimeStoreService implements RuntimeStore{
   

    private current:FlowRuntimeState={

        currentSceneId:null,

        activeNodeId:null,

        nodeStates:new Map(),

        sceneStates:new Map()

    }

  
    

    state(): Readonly<FlowRuntimeState> {

         return this.current


        
    }
    async replace(state: FlowRuntimeState): Promise<void> {
         
        this.current=structuredClone(state)
    }

    async patch(patch: FlowRuntimeStatePatch) {
        this.current={
            ...this.current,

            ...structuredClone(patch)
        }
    }
    

    
}
