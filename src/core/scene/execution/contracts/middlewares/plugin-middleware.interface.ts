
import { FlowPlugin } from 'src/core/plugins/contracts/flow-plugin.interface';
import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { Middleware } from './middleware.interface';
import { ExecutionSession } from '../../context/execution-context.class';


export interface PluginMiddleware
  extends Middleware {

  execute(

    context: ExecutionSession,

    next: () => Promise<PluginDecision>

  ): Promise<PluginDecision>;

}