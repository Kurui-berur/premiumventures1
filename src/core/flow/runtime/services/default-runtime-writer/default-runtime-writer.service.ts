import { Inject, Injectable } from '@nestjs/common';
import { RuntimeWriter } from '../../contracts/runtime-writer.interface';
import { RUNTIME_STORE, RUNTIME_TRACKER } from '../../tokens/runtime-tokens';
import type { RuntimeStore } from '../../contracts/runtime-store.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import { FlowRuntimeStatePatch } from '../../contracts/runtime-state-patch.interface';
import { In } from 'typeorm';
import type { RuntimeTracker } from '../../contracts/runtime-tracker.interface';

@Injectable()
export class DefaultRuntimeWriterService implements RuntimeWriter{

    constructor(
          @Inject(RUNTIME_STORE)
          private readonly store:RuntimeStore,

          @Inject(RUNTIME_TRACKER)
          private readonly tracker:RuntimeTracker
    ){
      
        
    }
    
    async update(state: FlowRuntimeState): Promise<void> {

        await this.store.replace(state)
       
    }

    async updatePatch(patch: FlowRuntimeStatePatch) {
        await this.store.patch(patch)
    }
}
