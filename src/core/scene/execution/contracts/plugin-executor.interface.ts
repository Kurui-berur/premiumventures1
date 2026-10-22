

import {
PluginDecision
}
from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionSession } from '../context/execution-session.class';

export interface PluginExecutor {

  execute(

    context:
      ExecutionSession

  ): Promise<
      PluginDecision
    >;

}