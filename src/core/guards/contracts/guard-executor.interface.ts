import { PluginDecision } from "src/core/plugins/contracts/plugin-decision.interface";
import { ExecutionFrame } from "src/core/scene/execution/contracts/execution-frame.interface";
import { GuardResult } from "./guard-result.interface";

export interface GuardExecutor {
  execute(
    frame: ExecutionFrame,
    decision: PluginDecision
  ): Promise<GuardResult>;

}