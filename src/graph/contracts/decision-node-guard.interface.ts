import { FlowNode } from "src/graph/types/flow-node.type";
import { DecisionNode } from "src/graph/types/decision-node.types";

export interface DecisionNodeGuard {

    isDecisionNode(

        node: FlowNode,

    ): node is DecisionNode;

}