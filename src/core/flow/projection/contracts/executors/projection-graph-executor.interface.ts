import { ProjectionSession } from '../../context/projection-session.interface';

export interface ProjectionGraphExecutor {

    execute(
        session: ProjectionSession
    ): Promise<void>;

}