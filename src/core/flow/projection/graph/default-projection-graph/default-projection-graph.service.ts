import { Inject, Injectable } from '@nestjs/common';
import { ProjectionGraph } from '../../contracts/graph/projection-graph.interface';
import { CompiledScene } from 'src/graph/contracts/compiled-scene.interfaces';
import type { GraphReader } from 'src/graph/graph-core/contracts/graph-reader.interface';
import { GRAPH_READER } from 'src/graph/tokens/graph-tokens';
import { error } from 'console';
import { FlowNode } from 'src/graph/types/flow-node.type';

@Injectable()
export class DefaultProjectionGraphService implements ProjectionGraph {

    private readonly includedScenes=new Set<string>()

    private readonly orderedSceneIds:readonly string[]=[]

    constructor(
        @Inject(GRAPH_READER)
        private readonly graphReader:GraphReader,

        private readonly rootScene:string,

        sceneIds:readonly string[]
    ){
        this.orderedSceneIds=[...sceneIds]

        for(const sceneId of sceneIds){
            this.includedScenes.add(sceneId)
        }


    }
    sceneNodeIds(sceneId: string): readonly string[] {
       if(!this.hasScene(sceneId)){
        return []
       }
       return this.graphReader.sceneNodeIds(sceneId)
    }
    node(nodeId: string): FlowNode | undefined {
        if (
        this.ownerSceneId(nodeId) === undefined
    ) {

        return undefined;

    }

    return this.graphReader.node(nodeId);
    }
    ownerSceneId(nodeId: string): string | undefined {
        const ownerSceneId =
        this.graphReader.ownerSceneId(nodeId);

    if (
        ownerSceneId === undefined ||
        !this.hasScene(ownerSceneId)
    ) {

        return undefined;

    }

    return ownerSceneId;

    }
  
    rootSceneId(): string {
       return this.rootScene
    }
    hasScene(sceneId: string): boolean {
        return this.includedScenes.has(sceneId)
    }
    scene(sceneId: string): CompiledScene |undefined {
        if(!this.hasScene(sceneId)){
          return undefined
        }

        return this.graphReader.getScene(sceneId)
    }
    sceneIds(): readonly string[] {
        return this.orderedSceneIds
    }
}
