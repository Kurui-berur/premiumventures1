import {
  FlowPlugin
} from 'src/core/plugins/contracts/flow-plugin.interface';

import {
  PluginDecision
} from 'src/core/plugins/contracts/plugin-decision.interface';

import {
  RuntimeMutation
} from 'src/core/flow/runtime/types/runtime-mutation.type';
import { FlowRuntimeStatePatch } from 'src/core/flow/runtime/contracts/runtime-state-patch.interface';
import { RuntimeDiff } from './runtime/runtime-diff.class';

export class ExecutionState {

  private plugin?: FlowPlugin;

  private decision?: PluginDecision;

  private runtimeDiff?: RuntimeDiff;

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

recordRuntimeDiff(
  runtimeDiff: RuntimeDiff
): void {

  this.runtimeDiff = runtimeDiff;

}

  getPlugin():
    FlowPlugin | undefined {

    return this.plugin;

  }

  getDecision():
    PluginDecision | undefined {

    return this.decision;

  }

getRuntimeDiff():
  RuntimeDiff | undefined {

  return this.runtimeDiff;

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

 requireRuntimeDiff():
  RuntimeDiff {

  if (!this.runtimeDiff) {

    throw new Error(
      'ExecutionState does not contain a RuntimeDiff.'
    );

  }

  return this.runtimeDiff;

}
}