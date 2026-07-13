import { Inject, Injectable } from '@nestjs/common';
import { PluginExecutor } from '../../contracts/plugin-executor.interface';
import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionFrame } from '../../contracts/execution-frame.interface';
import type { FlowPlugin } from 'src/core/plugins/contracts/flow-plugin.interface';
import { PLUGIN_REGISTRY } from 'src/core/plugins/tokens/plugins.tokens';
import type { PluginRegistry } from 'src/core/plugins/contracts/plugin-registry.interface';
import { EXECUTION_TRACKER } from '../../tokens/execution.tokens';
import type { ExecutionTracker } from '../../contracts/execution-tracker.interface';
import { ExecutionContext } from '../../contracts/execution-context.interface';

@Injectable()
export class DefaultPluginExecutor implements PluginExecutor {

      constructor(

        @Inject(PLUGIN_REGISTRY)
        private readonly pluginRegistry: PluginRegistry,



  ) {}

     async execute(

    context:
      ExecutionContext

  ): Promise<
      PluginDecision
    > {

    const frame = context.frame;
    
    const plugin =await this.pluginRegistry.resolve(  frame.pluginId);

   const decision =await plugin.evaluate(

        frame.event,

        frame

      );

   

    return decision;

  }
}
