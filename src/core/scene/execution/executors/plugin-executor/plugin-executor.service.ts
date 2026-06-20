import { Injectable } from '@nestjs/common';
import { PluginExecutor } from '../../contracts/plugin-executor.interface';
import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionFrame } from '../../contracts/execution-frame.interface';
import type { FlowPlugin } from 'src/core/plugins/contracts/flow-plugin.interface';

@Injectable()
export class DefaultPluginExecutor implements PluginExecutor {

      constructor(

    private readonly plugin:
      FlowPlugin

  ) {}

    async execute(frame: ExecutionFrame): Promise<PluginDecision> {
        
    return this.plugin.evaluate(frame.event,frame)
    }
}
