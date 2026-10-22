import { Injectable } from '@nestjs/common';
import { ProjectionSessionFactory } from '../../factory_contracts/projection-session-factory.interface';
import { ProjectionFrame } from '../../frame/projection-frame.interface';
import { ProjectionMetadata } from '../../metadata/projection-metadata.classs';
import { ProjectionSession } from '../../projection-session.interface';
import { ProjectionState } from '../../state/projection-state.class';

@Injectable()
export class ProjectionSessionFactoryService implements ProjectionSessionFactory {
    create(frame: ProjectionFrame, 
        metadata: ProjectionMetadata, state: ProjectionState): ProjectionSession {
        return new ProjectionSession(
            frame,
            metadata,
            state
        )
    }
}
