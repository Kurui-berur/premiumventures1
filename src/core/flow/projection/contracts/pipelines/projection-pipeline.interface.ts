import { ProjectionSession } from "../../context/projection-session.interface";
import { ProjectionScope } from "../../types/projection-scope.types";

export interface ProjectionPipeline {

  readonly scope:
    ProjectionScope;

  execute(
    session: ProjectionSession
  ): Promise<void>;

}