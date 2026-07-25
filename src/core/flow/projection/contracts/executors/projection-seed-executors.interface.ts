import { ProjectionSession } from "../../context/projection-session.interface";

export interface ProjectionSeedExecutor {

  execute(
    session: ProjectionSession
  ): Promise<void>;

}