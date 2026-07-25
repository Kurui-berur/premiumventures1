import { Inject, Injectable } from '@nestjs/common';
import { RuntimeSnapshot } from '../../contracts/runtime-snapshot.interface';
import type { RuntimeWriter } from '../../contracts/runtime-writer.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';

import {  RUNTIME_WRITER } from '../../tokens/runtime-tokens';
import type { RuntimeStateReader } from '../../contracts/runtime-state-reader.interface';
import { RUNTIME_STATE_READER } from '../../tokens/readers/readers-tokens';

@Injectable()
export class DefaultRuntimeSnapshotService implements RuntimeSnapshot{

    constructor(

        @Inject(RUNTIME_WRITER)
        private readonly writter:RuntimeWriter,

        @Inject(RUNTIME_STATE_READER)
        private readonly reader:RuntimeStateReader


    ){}


     async  capture(): Promise<FlowRuntimeState> {
        return structuredClone(this.reader.state())
    }

     async restore(state: FlowRuntimeState): Promise<void> {
        await this.writter.apply(
            {
                type:'REPLACE',
                state
            })
    }
}
