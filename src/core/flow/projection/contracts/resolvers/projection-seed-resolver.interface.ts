import { ProjectionSession } from "../../context/projection-session.interface";
import { ProjectionSeed } from "../../context/state/projection-seed.interface";

export interface ProjectionSeedResolver {
  resolve(
    session: ProjectionSession,
  ): Promise<ProjectionSeed>;
}