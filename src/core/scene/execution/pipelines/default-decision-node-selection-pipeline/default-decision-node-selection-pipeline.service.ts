import { Injectable } from '@nestjs/common';
import { DecisionNodeSelectionPipeline } from '../../contracts/pipelines/decision-node-selection-pipeline.interface';
import { ExecutionSession } from '../../context/execution-session.class';
import { ExecutionScope } from '../../types/execution-scope.type';
import type { DecisionNodeSelector,} from 'src/core/plugins/contracts/decision/decision-node-selector.interface';

@Injectable()
export class DefaultDecisionNodeSelectionPipelineService implements DecisionNodeSelectionPipeline {
    constructor(
        private readonly selector:DecisionNodeSelector
    ){}
    readonly scope: ExecutionScope=ExecutionScope.DECISION_NODE_SELECTION
    async execute(context: ExecutionSession): Promise<void> {
        const decisionNode=this.selector.select(
            context.frame.runtime,
            context.frame.graph
        )
        context.state.decision.bindDecisionNode(decisionNode)
    }
}
