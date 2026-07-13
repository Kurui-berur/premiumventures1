import { GuardFailureAction } from "../types/guard-failure-action.type";
import { GuardFailureBehavior } from "./guard-failure-behaviour.interface";

export interface GuardRequest {

  id:
    string;

  metadata?:
    Readonly<
      Record<
        string,
        unknown
      >
    >;
    onFailure?:{

        action:GuardFailureBehavior

    }

}