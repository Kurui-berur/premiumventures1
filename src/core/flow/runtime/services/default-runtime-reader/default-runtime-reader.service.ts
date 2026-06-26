import { Inject, Injectable } from '@nestjs/common';
import { RuntimeReader } from '../../contracts/runtime-reader.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import type { RuntimeStore } from '../../contracts/runtime-store.interface';
import { RUNTIME_STORE } from '../../tokens/runtime-tokens';

@Injectable()
export class DefaultRuntimeReaderService implements RuntimeReader {

    constructor(
        @Inject(RUNTIME_STORE)
        private readonly store:RuntimeStore
    ){

    }


    state(): Readonly<FlowRuntimeState> {
        
        return this.store.state()
    }
   
    
}
