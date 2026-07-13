import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionFrame }
from './execution-frame.interface';
import { RuntimeMutation } from 'src/core/flow/runtime/types/runtime-mutation.type';
import { ExecutionSession } from '../context/execution-context.class';



export interface TransitionExecutor {

  execute(
    context:ExecutionSession

  ): Promise<void>;

}