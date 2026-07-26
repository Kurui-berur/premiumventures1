import { Injectable } from '@nestjs/common';
import { FlowSceneView } from '../../contracts/nodes/flow-scene-view.interface';


export class DefaultSceneView implements FlowSceneView {

   readonly sceneId: string;
   private readonly orderedNodeIds:readonly string[];
   
    constructor(
        sceneId: string,
        nodeIds: readonly string[],
    ){
        this.sceneId=sceneId
        this.orderedNodeIds=Object.freeze([...nodeIds])
        Object.freeze(this)

    }
    nodeIds(): readonly string[] {
        return this.orderedNodeIds
    }
}
