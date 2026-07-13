import {
ExecutionFrame
}
from 'src/core/scene/execution/contracts/execution-frame.interface';

import {
PluginDecision
}
from 'src/core/plugins/contracts/plugin-decision.interface';
import { GuardResult } from './guard-result.interface';

export interface Guard {

  readonly id:
    string;

  evaluate(

    frame:ExecutionFrame,
    
    decision:PluginDecision

  ): Promise<
    GuardResult
  >;

}