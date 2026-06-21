import { Injectable } from '@nestjs/common';
import { RuntimeCheckpointStore } from '../../contracts/runtime-checkpoint-store.interface';
import { FlowRuntimeState } from 'src/core/flow/runtime/state/flow-runtime-state';

@Injectable()
export class InMemoryCheckpointStore implements RuntimeCheckpointStore{

    private checkpoints:FlowRuntimeState|null=null;


    async save(state: FlowRuntimeState): Promise<void> {

        this.checkpoints=state
       
    }
   async latest(): Promise<FlowRuntimeState | null> {
        return this.checkpoints
    }

    


}
