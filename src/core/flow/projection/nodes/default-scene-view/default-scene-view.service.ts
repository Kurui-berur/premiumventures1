import { Injectable } from '@nestjs/common';
import { FlowSceneView } from '../../contracts/nodes/flow-scene-view.interface';

export class DefaultSceneView implements FlowSceneView {
   readonly sceneId: string;
    readonly nodeIds: readonly string[];
    constructor(
        sceneId: string,
        nodeIds: readonly string[],
    ){
        this.sceneId=sceneId
        this.nodeIds=Object.freeze([...nodeIds])
        Object.freeze(this)

    }
}
