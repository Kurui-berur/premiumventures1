import { Inject, Injectable } from '@nestjs/common';
import { ExecutionReplay } from '../../contracts/execution-replay.interface';
import type { RuntimeWriter } from 'src/core/flow/runtime/contracts/flow-writer.interface';
import type { ExecutionJournal } from '../../contracts/execution-journal.interface';
import { EXECUTION_JOURNAL, RUNTIME_CHECKPOINT } from '../../tokens/execution.tokens';
import { FlowRuntimeState } from 'src/core/flow/runtime/state/flow-runtime-state';
import type { RuntimeCheckpointStore } from '../../contracts/runtime-checkpoint-store.interface';

@Injectable()
export class DefaultExecutionReplayService implements ExecutionReplay{

   constructor(

    @Inject(EXECUTION_JOURNAL)
    private readonly journal:ExecutionJournal,
    
    private readonly runtime:RuntimeWriter,

    @Inject(RUNTIME_CHECKPOINT)
    private readonly  checkpoint:RuntimeCheckpointStore

   ){}

    async rebuild(): Promise<void> {

        const checkpoint=await this.checkpoint.latest();

        if(checkpoint){

            await this.runtime.update(checkpoint)

            return
        }
        

        const logs=await this.journal.entries();

        for( const entry of logs) {

            if (entry.stage!=="STATE_UPDATED"){
                continue
            }

            await this.runtime.update(entry.payload as FlowRuntimeState)
        }
    }

    
}
