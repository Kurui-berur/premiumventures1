import { PluginDecision } from "src/core/plugins/contracts/plugin-decision.interface";
import { ExecutionFrame } from "./execution-frame.interface";

export interface PluginExecutor {

  execute(
    frame: ExecutionFrame
  ): Promise<
    PluginDecision
  >;

}