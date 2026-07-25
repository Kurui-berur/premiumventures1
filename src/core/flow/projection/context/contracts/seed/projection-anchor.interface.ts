import { ProjectionAnchorKind } from "../../../types/projection-anchor-kind.type";

export interface ProjectionAnchor {

  readonly kind: ProjectionAnchorKind;

  /**
   * Optional identifier.
   *
   * Required for SCENE and BRANCH anchors.
   */
  readonly id?: string;

}