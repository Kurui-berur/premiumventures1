import { FlowNode } from "./flow-node.type";

interface DecisionNode extends FlowNode {
  readonly kind: FlowNodeKind.DECISION;
  readonly decisionType: string;
  readonly decisionEngineId: DecisionEngineId;
  readonly decisionConfig?: unknown;
  readonly version?: string;
}