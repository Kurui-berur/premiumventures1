import { Injectable } from '@nestjs/common';
import { ExecutionSession } from '../../execution-context.class';
import { ExecutionFrame } from '../../../contracts/execution-frame.interface';
import { ExecutionContextFactory } from '../execution-context-factory';
import { ExecutionState } from '../../execution-state.class';
import { ExecutionMetadata } from '../../metadata/execution-metadata.class';
import { ExecutionRuntime } from '../../runtime/execution-runtime.class';

@Injectable()
export class DefaultExecutionContextFactoryService 

implements ExecutionContextFactory {

  create(frame: ExecutionFrame): ExecutionSession {
    return new ExecutionSession(
        frame,

        new ExecutionState(),

        new ExecutionMetadata(),

        new ExecutionRuntime(frame.state))
  }

}
