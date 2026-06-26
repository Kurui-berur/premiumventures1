import { Inject, Injectable } from '@nestjs/common';
import { RuntimeSnapshot } from '../../contracts/runtime-snapshot.interface';
import type { RuntimeWriter } from '../../contracts/runtime-writer.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import type { RuntimeReader } from '../../contracts/runtime-reader.interface';
import { RUNTIME_READER, RUNTIME_WRITER } from '../../tokens/runtime-tokens';

@Injectable()
export class DefaultRuntimeSnapshotService implements RuntimeSnapshot{

    constructor(

        @Inject(RUNTIME_WRITER)
        private readonly writter:RuntimeWriter,

        @Inject(RUNTIME_READER)
        private readonly reader:RuntimeReader


    ){}


     async  capture(): Promise<FlowRuntimeState> {
        return structuredClone(this.reader.state())
    }

     async restore(state: FlowRuntimeState): Promise<void> {
        await this.writter.update(state)
    }
}
