import { Injectable } from '@nestjs/common';
import { FlowViewDescriptor } from '../../contracts/descriptors/flow-view-descriptor.interface';
import { ProjectionNodeSet } from '../../contracts/nodes/projection-node-set.interface';


export class DefaultFlowViewDescriptor implements FlowViewDescriptor {
    readonly projectionNodes: ProjectionNodeSet;
    readonly rootSceneId: string;

    constructor(

        projectionNodes:
            ProjectionNodeSet,

        rootSceneId: string,

    ){

        this.projectionNodes =
            projectionNodes;

        this.rootSceneId =
            rootSceneId;

        Object.freeze(this);

    }
}
