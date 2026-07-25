import { Injectable } from '@nestjs/common';
import { ExecutionStateFactory } from '../../factory_contracts/execution-state-factory.interface';
import { ExecutionState } from '../../execution-state.class';

@Injectable()
export class DefaultExecutionStateFactoryService implements ExecutionStateFactory{
    create(): ExecutionState {
        return new ExecutionState()
    }
}
