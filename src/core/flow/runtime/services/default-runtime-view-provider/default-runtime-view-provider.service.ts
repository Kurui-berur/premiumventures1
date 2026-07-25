import { Inject, Injectable } from '@nestjs/common';
import { RuntimeViewProvider } from '../../contracts/runtime-view-provider.interface';
import { RuntimeViewSnapshot } from '../../contracts/runtime-view-snapshot.interface';
import { FLOW_IDENTITY,  RUNTIME_VIEW_PROVIDER } from '../../tokens/runtime-tokens';
import type { FlowIdentityReader } from '../../contracts/flow-identity-reader.interface';
import type { RuntimeStateReader } from '../../contracts/runtime-state-reader.interface';
import { RUNTIME_STATE_READER } from '../../tokens/readers/readers-tokens';

@Injectable()
export class DefaultRuntimeViewProviderService implements RuntimeViewProvider{

    constructor(
        @Inject(RUNTIME_STATE_READER)
        private readonly runtime_reader:RuntimeStateReader,

        @Inject(FLOW_IDENTITY)
        private readonly flow:FlowIdentityReader,


    ){

    }
    snapshot(): RuntimeViewSnapshot {

        const identity=this.flow.current()

        return {

            flowId:identity.flowInstanceId,

            state:structuredClone(this.runtime_reader.state()),

            timestamp:Date.now()

        }
        
    }
}
