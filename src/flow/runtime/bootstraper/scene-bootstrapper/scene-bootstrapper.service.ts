import { Injectable } from '@nestjs/common';
import { CompiledSceneGraph } from 'src/graph/contracts/compiled-scene-graph.interfaces';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import { NodeRuntimeState } from '../../state/node-runtime-state';
import { SceneRuntimeState } from '../../state/scene-runtime-state';

@Injectable()
export class SceneBootstrapperService {
     bootstrap(
    graph: CompiledSceneGraph
  ): FlowRuntimeState {

    const entryScene =
      graph.scenes.get(graph.entrySceneId);

    if (!entryScene) {
      throw new Error(
        `Bootstrap failed: missing entry scene ${graph.entrySceneId}`
      );
    }

    const nodeStates =
      this.createNodeStates(graph, entryScene.id);

    const sceneStates =
      this.createSceneStates(graph, entryScene.id);

   return {
  currentSceneId: entryScene.id,
  activeNodeId: null, // 👈 ADD THIS

  nodeStates,
  sceneStates
};
  }

  // ======================================================
  // NODE STATES (PURE SNAPSHOT)
  // ======================================================

  private createNodeStates(
    graph: CompiledSceneGraph,
    activeSceneId: string
  ): ReadonlyMap<string, NodeRuntimeState> {

    const activeScene =
      graph.scenes.get(activeSceneId)!;

    const map = new Map<string, NodeRuntimeState>();

    for (const nodeId of activeScene.nodeIds) {

      map.set(nodeId, {
        nodeId,

        // initial visibility is purely structural
        visible:
          activeScene.initialVisibilityIndex.has(nodeId),

        interacted: false,
        completed: false
      });
    }

    return map;
  }

  // ======================================================
  // SCENE STATES (PURE SNAPSHOT)
  // ======================================================

  private createSceneStates(
    graph: CompiledSceneGraph,
    activeSceneId: string
  ): ReadonlyMap<string, SceneRuntimeState> {

    const map = new Map<string, SceneRuntimeState>();

    for (const sceneId of graph.scenes.keys()) {

      map.set(sceneId, {
        sceneId,
        visited: sceneId === activeSceneId,
        completed: false
      });
    }

    return map;
  }
}
