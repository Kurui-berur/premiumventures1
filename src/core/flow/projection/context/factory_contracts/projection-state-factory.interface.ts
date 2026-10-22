import { ProjectionState } from "../state/projection-state.class";

export interface ProjectionStateFactory {

    create(): Promise<ProjectionState>;

}