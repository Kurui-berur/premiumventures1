import { Injectable } from '@nestjs/common';
import { ProjectionStateFactory } from '../../factory_contracts/projection-state-factory.interface';
import { ProjectionState } from '../../state/projection-state.class';

@Injectable()
export class ProjectionStateFactoryService implements ProjectionStateFactory{
    async create(): Promise<ProjectionState> {
        return new ProjectionState()
    }
}
