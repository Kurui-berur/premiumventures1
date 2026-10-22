import { Injectable } from '@nestjs/common';
import { DecisionNodeSelector} from '../../contracts/decision/decision-node-selector.interface';
import { ProjectionRuntimeReader } from 'src/core/flow/runtime/contracts/reader/projection-runtime-reader.interface';
import { GraphReader } from 'src/graph/graph-core/contracts/graph-reader.interface';
import { DecisionNode } from 'src/graph/types/decision-node.types';
import type { DecisionNodeGuard } from 'src/graph/contracts/decision-node-guard.interface';

@Injectable()
export class DefaultDecisionSelectorService implements DecisionNodeSelector {
    constructor(
        private readonly guard:DecisionNodeGuard
    ){}
    select(runtime: ProjectionRuntimeReader, graph: GraphReader): DecisionNode {
        const nodeId=runtime.activeNodeId()

        if(!nodeId){
             throw new Error(

                "No active node is available.",

            );
        }

        const node=graph.node(nodeId)

        if(!node){

               throw new Error(

                `Node '${nodeId}' was not found.`,

            );
        }

        if(!this.guard.isDecisionNode(node)){
                        throw new Error(

                `Node '${node.id}' is not a decision node.`,

            );
        }

        return node


    }
}
