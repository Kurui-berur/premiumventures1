import { ProjectionSession } from "../../context/projection-session.interface";
import { ProjectionScope } from "../../types/projection-scope.types";


export interface ProjectionTracker {

    stageStarted(
        scope: ProjectionScope,
        session: ProjectionSession,
    ): Promise<void>;

    stageCompleted(
        scope: ProjectionScope,
        session: ProjectionSession,
    ): Promise<void>;

    stageFailed(
        scope: ProjectionScope,
        session: ProjectionSession,
        error: unknown,
    ): Promise<void>;

}