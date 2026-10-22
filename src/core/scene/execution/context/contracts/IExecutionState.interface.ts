import { DecisionNodeState } from "../state/decision-node-state.class";
import { DecisionResultState } from "../state/decision-state-result.class";
import { PluginState } from "../state/plugin-state.interface";
import { RuntimeDiffState } from "../state/runtime-diff-state.class";

export interface IExecutionState {
  readonly decision: DecisionNodeState;
  readonly plugin: PluginState;
  readonly decisionResult: DecisionResultState;
  readonly runtimeDiff: RuntimeDiffState;
  readonly graph: GraphState;
}