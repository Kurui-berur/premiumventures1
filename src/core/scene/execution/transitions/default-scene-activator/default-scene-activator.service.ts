import { Injectable } from '@nestjs/common';
import { SceneActivator } from '../../contracts/scene-activator.interface';
import type { GraphReader } from 'src/graph/graph-core/contracts/graph-reader.interface';
import { FlowRuntimeState } from 'src/core/flow/runtime/state/flow-runtime-state';

@Injectable()
export class DefaultSceneActivatorService implements SceneActivator {

    constructor(
        private readonly graph:GraphReader

){}

async activate(state: FlowRuntimeState, targetSceneId: string): Promise<FlowRuntimeState> {
    
    const scene=this.graph.getScene(targetSceneId);

    if(!scene){
        return state
    }

    const nodeStates=new Map()

    for(const nodeId of scene.nodeIds){

        nodeStates.set(nodeId,{

            nodeId,

            visible:scene.initialVisibilityIndex.has(nodeId),

            interacted:false,

            completed:false

        })
    }

    const sceneStates=new Map()

    sceneStates.set(
        targetSceneId,
        {
            sceneId:targetSceneId,

            interacted:false,

            completed:false
        }
    )

    return {

        ...state,

        currentSceneId:targetSceneId,

        activeNodeId:null,

        nodeStates,

        sceneStates

    }
}
}
