import { IExecutionState } from "./contracts/IExecutionState.interface";
import { DecisionNodeState } from "./state/decision-node-state.class";
import { DecisionResultState } from "./state/decision-state-result.class";
import { PluginState } from "./state/plugin-state.interface";
import { RuntimeDiffState } from "./state/runtime-diff-state.class";


export class ExecutionState implements IExecutionState {

  readonly decision = new DecisionNodeState();

  readonly plugin = new PluginState();

  readonly decisionResult = new DecisionResultState();

  readonly runtimeDiff = new RuntimeDiffState();

  readonly graph = new GraphState();

}