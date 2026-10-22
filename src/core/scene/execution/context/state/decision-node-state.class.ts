import { DecisionNode } from "src/graph/types/decision-node.types";

export class DecisionNodeState {

    private decisionNode?: DecisionNode;

    bindDecisionNode(
        decisionNode: DecisionNode,
    ): void {

        this.decisionNode = decisionNode;

    }

    requireDecisionNode(): DecisionNode {

        if (!this.decisionNode) {

            throw new Error(
                "No decision node has been selected.",
            );

        }

        return this.decisionNode;

    }

    hasDecisionNode(): boolean {

        return this.decisionNode !== undefined;

    }

    clear(): void {

        this.decisionNode = undefined;

    }

}