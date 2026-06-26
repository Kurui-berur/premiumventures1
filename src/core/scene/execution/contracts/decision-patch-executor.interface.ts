import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionFrame } from './execution-frame.interface';

export interface DecisionPatchExecutor {

  execute(
    frame: ExecutionFrame,
    decision: PluginDecision
  ): Promise<void>;

}