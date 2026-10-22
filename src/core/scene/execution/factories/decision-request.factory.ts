import { Injectable } from '@nestjs/common';

import { ExecutionSession } from '../context/execution-session.class';
import { DecisionRequestFactory } from '../contracts/factories/decision-request-factory.interface';
import { DecisionRequest } from '../contracts/decision/decision-request.interface';

@Injectable()
export class DefaultDecisionRequestFactory implements DecisionRequestFactory {

    create(
        context: ExecutionSession
    ): DecisionRequest {

        const decisionNode =
            context.state.decision.requireDecisionNode();

        return {
            decisionNodeId: decisionNode.id,
            decisionType: decisionNode.decisionType,
            decisionConfig: decisionNode.decisionConfig,
            input: context.frame.event.payload,
        };
    }
}