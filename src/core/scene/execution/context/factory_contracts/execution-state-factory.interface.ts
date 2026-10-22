import { IExecutionState } from "../contracts/IExecutionState.interface";


export interface ExecutionStateFactory {

  create(): IExecutionState;

}