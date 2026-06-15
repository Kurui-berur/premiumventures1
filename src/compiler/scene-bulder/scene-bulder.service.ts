import { Injectable } from '@nestjs/common';
import { FlowTransition } from 'src/flow/types/flow-transitions';
import { CompiledNodeRef } from 'src/graph/contracts/compiled-node-Ref.interfaces';
import { CompiledScene } from 'src/graph/contracts/compiled-scene.interfaces';
import { SceneTransition } from 'src/graph/contracts/scene-transition.interface';
import { FlowNode } from 'src/graph/types/flow-node.type';

@Injectable()
export class SceneBulderService {
    build(
        sceneId:string,
        nodes:readonly FlowNode[],
        transitions:readonly SceneTransition[]
    ):CompiledScene{
        const nodeIds: string[] = [];
        const compiledNodes : CompiledNodeRef[] = [];
        const initialVisibilityIndex = new Map<string, true>();
        const initiallyVisibleNodeIds: string[] = [];

        for(const node of nodes){
            nodeIds.push(node.id);
            compiledNodes.push({
                nodeId: node.id,
                renderer: node.renderer,
                content: node.content,
            
            });

            initialVisibilityIndex.set(node.id, true);
            initiallyVisibleNodeIds.push(node.id);
        }
        return {
            id: sceneId,
            nodeIds,
            nodes: compiledNodes,
            initialVisibilityIndex,
            initiallyVisibleNodeIds,
            transitions,
            completionMode: 'ALL_COMPLETED',
        }
    }
};