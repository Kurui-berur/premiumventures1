import { ProjectionMode } from "../../../types/projection-mode.type";
import { ProjectionScope } from "../../../types/projection-scope.types";
import { ProjectionPolicies } from "../seed/projection-policies.interface";

export interface ProjectionIntent {

  readonly mode: ProjectionMode;

  readonly scope: ProjectionScope;

  readonly policies: ProjectionPolicies;

}