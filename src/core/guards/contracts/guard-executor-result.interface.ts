import { PluginDecision } from "src/core/plugins/contracts/plugin-decision.interface";
import { GuardResult } from "./guard-result.interface";

export interface GuardExecutionResult {

  decision:
    PluginDecision;

  passed:
    boolean;

  failedGuardId?:
    string;

  result?:
    GuardResult;

}