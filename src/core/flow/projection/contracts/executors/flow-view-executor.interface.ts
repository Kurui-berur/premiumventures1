import { ProjectionSession } from "../../context/projection-session.interface";

export interface FlowViewExecutor {

    execute(

        session: ProjectionSession,

    ): Promise<void>;

}