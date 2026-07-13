import { Inject, Injectable } from '@nestjs/common';
import { RuntimeRecoveryCoordinator } from '../../contracts/runtime-recovery-coordinator.interface';
import { RUNTIME_JOURNAL_READER, RUNTIME_WRITER } from '../../tokens/runtime-tokens';
import type { RuntimeWriter } from '../../contracts/runtime-writer.interface';
import type { RuntimeJournalReader } from '../../contracts/runtime-journal-reader.interface';
import { RUNTIME_CHECKPOINT } from 'src/core/scene/execution/tokens/execution.tokens';
import type { RuntimeCheckpointStore } from 'src/core/scene/execution/contracts/runtime-checkpoint-store.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import { FlowRuntimeStatePatch } from '../../contracts/runtime-state-patch.interface';

@Injectable()
export class DefaultRuntimeRecoveryCoordinatorService implements RuntimeRecoveryCoordinator{
      
    constructor(
        @Inject(RUNTIME_WRITER)
        private readonly runtime_writer:RuntimeWriter,

        @Inject(RUNTIME_JOURNAL_READER)
        private readonly journal:RuntimeJournalReader,

        @Inject(RUNTIME_CHECKPOINT)
        private readonly checkpoints:RuntimeCheckpointStore
    ){

    }

   async recover(): Promise<void> {

    const checkpoint=await this.checkpoints.latest()

    if(checkpoint){
        await this.runtime_writer.update(checkpoint)
    }
         
    const logs=await this.journal.entries()

    for(const entry of logs){
        if (entry.stage==='STATE_REPLACED'){

            await this.runtime_writer.update(entry.payload as FlowRuntimeState)
        }

        if(entry.stage==='PATCH_APPLIED'){

            await this.runtime_writer.updatePatch(entry.payload as FlowRuntimeStatePatch)
        }
    }

          
    }
    
}
