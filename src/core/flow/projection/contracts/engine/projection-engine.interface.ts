import { ProjectionSession } from "../../context/projection-session.interface";

export interface ProjectionEngine {

    execute(
        session: ProjectionSession,
    ): Promise<void>;

}