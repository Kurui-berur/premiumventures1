import { ExecutionState } from "../execution-state.class";

export interface ExecutionStateFactory {

  create(): ExecutionState;

}