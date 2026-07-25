import { ProjectionSession }
from "../../context/projection-session.interface";

export interface ProjectionNodeExecutor {

    execute(

        session: ProjectionSession,

    ): Promise<void>;

}