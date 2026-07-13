import { Inject, Injectable } from '@nestjs/common';
import { RuntimeViewProvider } from '../../contracts/runtime-view-provider.interface';
import { RuntimeViewSnapshot } from '../../contracts/runtime-view-snapshot.interface';
import { FLOW_IDENTITY, RUNTIME_READER, RUNTIME_VIEW_PROVIDER } from '../../tokens/runtime-tokens';
import type { RuntimeReader } from '../../contracts/runtime-reader.interface';
import type { FlowIdentityReader } from '../../contracts/flow-identity-reader.interface';

@Injectable()
export class DefaultRuntimeViewProviderService implements RuntimeViewProvider{

    constructor(
        @Inject(RUNTIME_READER)
        private readonly runtime_reader:RuntimeReader,

        @Inject(FLOW_IDENTITY)
        private readonly flow:FlowIdentityReader,


    ){

    }
    snapshot(): RuntimeViewSnapshot {

        return {

            flowId:this.flow.flowId(),

            state:structuredClone(this.runtime_reader.state()),

            timestamp:Date.now()

        }
        
    }
}
