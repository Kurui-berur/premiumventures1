import { ProjectionSession }
from "../../context/projection-session.interface";

export interface ProjectionCandidateNodeExecutor {

    execute(

        session: ProjectionSession,

    ): Promise<void>;

}