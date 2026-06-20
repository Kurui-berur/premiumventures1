import { Injectable } from '@nestjs/common';
import { GraphReader } from '../../contracts/graph-reader.interface';
import { CompiledScene } from 'src/graph/contracts/compiled-scene.interfaces';
import { SceneTransition } from 'src/graph/contracts/scene-transition.interface';
import { FlowNode } from 'src/graph/types/flow-node.type';
import type { CompiledSceneGraph } from 'src/graph/contracts/compiled-scene-graph.interfaces';

@Injectable()
export class GraphReaderService implements GraphReader {

    constructor(private readonly graph:CompiledSceneGraph){}

    entrySceneId(): string {
        return this.graph.entrySceneId
    }

    getScene(sceneId: string): CompiledScene | undefined {

        return this.graph.scenes.get(sceneId)
       
    }
    hasScene(sceneId: string): boolean {

        return this.graph.scenes.has(sceneId)
       
    }
    
    entryScene(): CompiledScene{
        
        return this.graph.scenes.get(this.graph.entrySceneId)!
    }
    outgoing(sceneId: string): readonly SceneTransition[] {
         const scene=this.graph.scenes.get(sceneId)
         return scene?.transitions ?? []
    }
    node(nodeId: string): FlowNode | undefined {
       return this.graph.nodeLookup.get(nodeId)
    }
    ownerSceneId(nodeId: string): string | undefined {
        return this.graph.nodeToScene.get(nodeId)
    }

    sceneNodeIds(sceneId: string) {
  return this.graph.scenes.get(sceneId)?.nodeIds ?? [];
}

sceneInitialVisibleNodeIds(sceneId: string): readonly string[] {
  const scene = this.graph.scenes.get(sceneId);

  return scene?.initiallyVisibleNodeIds ?? []
}

sceneIds(): readonly string[] {
  return Array.from(this.graph.scenes.keys());
}
    
}
