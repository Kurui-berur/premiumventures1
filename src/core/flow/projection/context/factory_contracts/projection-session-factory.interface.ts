import { ProjectionFrame } from "../frame/projection-frame.interface";
import { ProjectionMetadata } from "../metadata/projection-metadata.classs";
import { ProjectionSession } from "../projection-session.interface";
import { ProjectionState } from "../state/projection-state.class";

export interface ProjectionSessionFactory {

    create(

        frame: ProjectionFrame,

        metadata: ProjectionMetadata,

        state: ProjectionState,

    ): ProjectionSession;

}