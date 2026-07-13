

import {
PluginDecision
}
from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionSession } from '../context/execution-context.class';

export interface PluginExecutor {

  execute(

    context:
      ExecutionSession

  ): Promise<
      PluginDecision
    >;

}