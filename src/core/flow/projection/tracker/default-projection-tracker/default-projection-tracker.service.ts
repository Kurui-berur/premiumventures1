import { Injectable } from '@nestjs/common';
import { ProjectionTracker } from '../../contracts/tracker/projection-tracker.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import { ProjectionScope } from '../../types/projection-scope.types';

@Injectable()
export class DefaultProjectionTrackerService implements ProjectionTracker{
    async stageStarted(scope: ProjectionScope, session: ProjectionSession): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stageCompleted(scope: ProjectionScope, session: ProjectionSession): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stageFailed(scope: ProjectionScope, session: ProjectionSession, error: unknown): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
