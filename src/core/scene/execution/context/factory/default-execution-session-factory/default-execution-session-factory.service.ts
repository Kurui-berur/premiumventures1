import { Inject, Injectable } from '@nestjs/common';
import { ExecutionSession } from '../../execution-context.class';
import { ExecutionFrame } from '../../../contracts/execution-frame.interface';

import { ExecutionState } from '../../execution-state.class';
import { ExecutionMetadata } from '../../metadata/execution-metadata.class';
import { ExecutionRuntime } from '../../runtime/execution-runtime.class';
import { ExecutionSessionFactory } from '../execution-session-factory';
import type { ExecutionMetadataFactory } from '../../factory_contracts/execution-metadata-factory.interface';
import type { ExecutionRuntimeFactory } from '../../factory_contracts/execution-runtime-factory.interface';
import type { ExecutionStateFactory } from '../../factory_contracts/execution-state-factory.interface';
import { EXECUTION_STATE_FACTORY, EXECUTION_METADATA_FACTORY, EXECUTION_RUNTIME_FACTORY } from '../../../tokens/factories/execution-factories.tokens';

@Injectable()
export class DefaultExecutionSessionFactoryService 

implements ExecutionSessionFactory {

  constructor(

    @Inject(EXECUTION_STATE_FACTORY)
    private readonly state:
        ExecutionStateFactory,

    @Inject(EXECUTION_METADATA_FACTORY)
    private readonly metadata:
        ExecutionMetadataFactory,

    @Inject(EXECUTION_RUNTIME_FACTORY)
    private readonly runtime:
        ExecutionRuntimeFactory

) {}
  create(frame: ExecutionFrame): ExecutionSession {
    return new ExecutionSession(
        frame,

        this.state.create(),

        this.metadata.create(),
        
        this.runtime.create(frame)
    )

        

       
  }

}
