import { Inject, Injectable } from '@nestjs/common';
import { RuntimeSnapshotReader } from '../../contracts/runtime-snapshot-reader.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import { RUNTIME_READER } from '../../tokens/runtime-tokens';
import type { RuntimeReader } from '../../contracts/runtime-state-reader.interface';

@Injectable()
export class DefaultRuntimeSnapshotReaderService implements RuntimeSnapshotReader {

    constructor(
        @Inject(RUNTIME_READER)
        private readonly reader:RuntimeReader
        
    ){}
    
    snapshot(): Readonly<FlowRuntimeState> {
        return structuredClone(
            this.reader.state()
        )
    }
    
}
