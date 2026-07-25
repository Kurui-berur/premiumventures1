
import { ProjectionScope } from '../../types/projection-scope.types';
import { ProjectionSession } from '../../context/projection-session.interface';
import { ProjectionGraph } from '../graph/projection-graph.interface';

export interface ProjectionGraphStrategy {

    readonly scope: ProjectionScope;

    create(
        session: ProjectionSession
    ): Promise<ProjectionGraph>;

}