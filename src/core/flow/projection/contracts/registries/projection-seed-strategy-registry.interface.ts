import { ProjectionMode } from "../../types/projection-mode.type";
import { ProjectionSeedStrategy } from "../strategies/projection-seed-strategy.interface";

export interface ProjectionSeedStrategyRegistry {
  resolve(
    mode: ProjectionMode,
  ): Promise<ProjectionSeedStrategy>;
}