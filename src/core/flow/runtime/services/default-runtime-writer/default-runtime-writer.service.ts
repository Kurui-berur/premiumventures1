import {
Inject,
Injectable
}
from '@nestjs/common';

import {
RuntimeWriter
}
from '../../contracts/runtime-writer.interface';



import {
RUNTIME_STORE
}
from '../../tokens/runtime-tokens';

import type {
RuntimeStore
}
from '../../contracts/runtime-store.interface';
import { RuntimeMutation } from '../../types/runtime-mutation.type';
import { FlowRuntimeState } from '../../state/flow-runtime-state';

@Injectable()
export class DefaultRuntimeWriterService
implements RuntimeWriter {

constructor(

@Inject(
RUNTIME_STORE
)

private readonly store:
RuntimeStore

){}

async apply(

mutation:
RuntimeMutation

): Promise<void> {

switch(
mutation.type
){

case 'REPLACE':

await this.store
.replace(
mutation.state
);

return;

case 'PATCH':

await this.store
.patch(
mutation.patch
);

return;

}

}

}