import { SelectedScene } from "../contracts/scene/selected-scene.interface";
import { ProjectionFrame } from "./frame/projection-frame.interface";
import { ProjectionMetadata } from "./metadata/projection-metadata.classs";
import { ProjectionState } from "./state/projection-state.class";

export class ProjectionSession {

  constructor(

    readonly frame: ProjectionFrame,

    readonly metadata:ProjectionMetadata,

    readonly state:ProjectionState

  ) {}

  }