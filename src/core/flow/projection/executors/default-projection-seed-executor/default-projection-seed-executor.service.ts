import { Injectable } from '@nestjs/common';
import { ProjectionSeedExecutor } from '../../contracts/executors/projection-seed-executors.interface';
import { ProjectionSession } from '../../context/projection-session.interface';

@Injectable()
export class DefaultProjectionSeedExecutorService implements ProjectionSeedExecutor{
    async execute(session: ProjectionSession): Promise<void> {
        
    }
}
