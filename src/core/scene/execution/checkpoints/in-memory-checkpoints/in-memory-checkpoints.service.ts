import { Injectable } from '@nestjs/common';

import { RuntimeCheckpointStore }
from '../../contracts/runtime-checkpoint-store.interface';

import { FlowRuntimeState }
from 'src/core/flow/runtime/state/flow-runtime-state';

@Injectable()
export class InMemoryCheckpointStore
implements RuntimeCheckpointStore {

private checkpoint:
FlowRuntimeState|null=null;

async save(state:FlowRuntimeState): Promise<void>{

this.checkpoint =

structuredClone(
state
);

}

async latest(): Promise<FlowRuntimeState|null
>{

if(
!this.checkpoint
){

return null;

}

return structuredClone(
this.checkpoint
);

}

}