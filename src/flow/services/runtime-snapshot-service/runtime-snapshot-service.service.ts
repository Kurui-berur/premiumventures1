import { Injectable } from '@nestjs/common';
import { FlowRuntimeState } from 'src/core/flow/runtime/state/flow-runtime-state';
import type { RuntimeReaderPort } from 'src/flow/ports/runtime-reader.port';
import { RuntimeSnapshotPort } from 'src/flow/ports/runtime-snapshot.port';

@Injectable()
export class RuntimeSnapshotServiceService implements RuntimeSnapshotPort{
    constructor(

        private readonly runtime:RuntimeReaderPort
    ){
        
    }
    async get(flowId: string): Promise<FlowRuntimeState> {

        return this.runtime.load(flowId)
        
    }
}
