import { GuardFailureAction } from "../types/guard-failure-action.type";

export interface GuardFailureBehavior {

  action:GuardFailureAction;


  transitionId?:
    string;

}