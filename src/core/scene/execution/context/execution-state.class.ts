import {
  FlowPlugin
} from 'src/core/plugins/contracts/flow-plugin.interface';

import {
  PluginDecision
} from 'src/core/plugins/contracts/plugin-decision.interface';

import {
  RuntimeMutation
} from 'src/core/flow/runtime/types/runtime-mutation.type';

export class ExecutionState {

  private plugin?: FlowPlugin;

  private decision?: PluginDecision;

  private runtimeMutation?: RuntimeMutation;

  recordPlugin(
    plugin: FlowPlugin
  ): void {

    this.plugin = plugin;

  }

  recordDecision(
    decision: PluginDecision
  ): void {

    this.decision = decision;

  }

  recordRuntimeMutation(
    runtimeMutation: RuntimeMutation
  ): void {

    this.runtimeMutation = runtimeMutation;

  }

  getPlugin():
    FlowPlugin | undefined {

    return this.plugin;

  }

  getDecision():
    PluginDecision | undefined {

    return this.decision;

  }

  getRuntimeMutation():
    RuntimeMutation | undefined {

    return this.runtimeMutation;

  }

  requirePlugin():
    FlowPlugin {

    if (!this.plugin) {

      throw new Error(
        'ExecutionState does not contain a FlowPlugin.'
      );

    }

    return this.plugin;

  }

  requireDecision():
    PluginDecision {

    if (!this.decision) {

      throw new Error(
        'ExecutionState does not contain a PluginDecision.'
      );

    }

    return this.decision;

  }

  requireRuntimeMutation():
    RuntimeMutation {

    if (!this.runtimeMutation) {

      throw new Error(
        'ExecutionState does not contain a RuntimeMutation.'
      );

    }

    return this.runtimeMutation;

  }

}