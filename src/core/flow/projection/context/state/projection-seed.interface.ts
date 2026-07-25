// projection/context/state/projection-seed.interface.ts

import { ProjectionScope } from "../../types/projection-scope.types";
import { ProjectionAnchor } from "../contracts/seed/projection-anchor.interface";
import { ProjectionPolicies } from "../contracts/seed/projection-policies.interface";


export interface ProjectionSeed {

  readonly anchor: ProjectionAnchor;

  readonly scope: ProjectionScope;

}