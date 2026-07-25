import { ProjectionGraph } from '../../context/state/projection-graph.interface';
import { ProjectionSession } from '../../context/projection-session.interface';

export interface ProjectionGraphResolver {

    resolve(
        session: ProjectionSession
    ): Promise<ProjectionGraph>;

}