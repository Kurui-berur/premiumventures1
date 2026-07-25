import { Injectable } from '@nestjs/common';
import { FlowView } from '../../contracts/nodes/flow-view.interface';
import { FlowNode } from 'src/graph/types/flow-node.type';
import { FlowSceneView } from '../../contracts/nodes/flow-scene-view.interface';

export class DefaultFlowView implements FlowView{
    readonly rootSceneId: string;
    readonly sceneIds: readonly string[];
    readonly scenes: Readonly<Record<string, FlowSceneView>>;
    readonly nodes: Readonly<Record<string, FlowNode>>;
    constructor(
          rootSceneId: string,

        sceneIds: readonly string[],

        scenes:
            Readonly<Record<
                string,
                FlowSceneView
            >>,

        nodes:
            Readonly<Record<
                string,
                FlowNode
            >>,
    ){
           this.rootSceneId =
            rootSceneId;

        this.sceneIds =

            Object.freeze([
                ...sceneIds,
            ]);

        this.scenes =

            Object.freeze({

                ...scenes,

            });

        this.nodes =

            Object.freeze({

                ...nodes,

            });

        Object.freeze(this);
    }
}
