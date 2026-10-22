import { Injectable } from '@nestjs/common';
import { DecisionNodeGuard } from 'src/graph/contracts/decision-node-guard.interface';
import { DecisionNode } from 'src/graph/types/decision-node.types';
import { FlowNode } from 'src/graph/types/flow-node.type';

@Injectable()
export class DefaultDecisionNodeGuardService implements DecisionNodeGuard {
    isDecisionNode(node: FlowNode): node is DecisionNode {
        return node.type === "decision";

    }
}
