import { Inject, Injectable } from '@nestjs/common';
import { RuntimeTracker } from '../../contracts/runtime-tracker.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import { RUNTIME_JOURNAL, RUNTIME_READER } from '../../tokens/runtime-tokens';
import type { RuntimeJournal } from '../../contracts/runtime-journal.interface';
import type { RuntimeReader } from '../../contracts/runtime-reader.interface';
import { FlowRuntimeStatePatch } from '../../contracts/runtime-state-patch.interface';

@Injectable()
export class DefaultRuntimeTrackerService implements RuntimeTracker {

    constructor(
        @Inject(RUNTIME_JOURNAL)
        private readonly journal:RuntimeJournal,


        @Inject(RUNTIME_READER)
        private readonly runtime:RuntimeReader
    ){

    }
  

   async replaced(flowId:string,state: FlowRuntimeState): Promise<void> {
        await this.journal.record({
            flowId,

            timestamp:Date.now(),

            stage:"STATE_REPLACED",

            payload:state

            


        })
    }
    async   patched(flowId: string, patch: FlowRuntimeStatePatch) {
          await this.journal.record({
            flowId,

            timestamp:Date.now(),

            stage:"PATCH_APPLIED",

            payload:patch
          })
    }
}
