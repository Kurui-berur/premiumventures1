import { Injectable } from '@nestjs/common';
import { RuntimeStore } from '../../contracts/runtime-store.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import { NodeRuntimeState } from '../../state/node-runtime-state';
import { SceneRuntimeState } from '../../state/scene-runtime-state';
import { FlowRuntimeStatePatch} from '../../contracts/runtime-state-patch.interface';

@Injectable()
export class InMemoryFlowRuntimeStoreService implements RuntimeStore{
   

private current: FlowRuntimeState | null = null;

  
    

state(): Readonly<FlowRuntimeState> {

    if (!this.current) {
        throw new Error(
            'Runtime has not been initialized.'
        );
    }

    return this.current;

}


    async replace(state: FlowRuntimeState): Promise<void> {
         
        this.current=structuredClone(state)
    }

    
    async patch(patch: FlowRuntimeStatePatch) {
          if (!this.current) {
    throw new Error(
      'Cannot patch runtime before it has been initialized.'
    );
  }
        this.current={
            ...this.current,

            ...structuredClone(patch)
        }
    }
    

    
}
