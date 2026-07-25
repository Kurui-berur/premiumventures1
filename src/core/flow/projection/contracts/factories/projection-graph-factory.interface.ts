import { ProjectionSession }
from '../../context/projection-session.interface';
import { ProjectionGraphDescriptor } from '../descriptors/projectiongraphdescriptor.interface';

import { ProjectionGraph }
from '../graph/projection-graph.interface';



export interface ProjectionGraphFactory {

    create(

        session: ProjectionSession,

        descriptor: ProjectionGraphDescriptor,

    ): Promise<ProjectionGraph>;

}