import { Injectable } from '@nestjs/common';
import { ExecutionRuntimeFactory } from '../../factory_contracts/execution-runtime-factory.interface';
import { ExecutionFrame } from '../../../contracts/execution-frame.interface';
import { ExecutionRuntime } from '../../runtime/execution-runtime.class';

@Injectable()
export class DefaultExecutionRuntimeFactoryService implements ExecutionRuntimeFactory {
    create(frame: ExecutionFrame): ExecutionRuntime {
        return new ExecutionRuntime(frame.state)
    }
}
