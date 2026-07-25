import { ProjectionSession } from "../../context/projection-session.interface";
import { ProjectionSeed } from "../../context/state/projection-seed.interface";
import { ProjectionMode } from "../../types/projection-mode.type";

export interface ProjectionSeedStrategy {
  readonly mode: ProjectionMode;

  create(
    session: ProjectionSession,
  ): Promise<ProjectionSeed>;
}