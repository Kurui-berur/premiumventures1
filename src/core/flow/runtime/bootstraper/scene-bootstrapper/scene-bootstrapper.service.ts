import { Injectable } from '@nestjs/common';
import { CompiledSceneGraph } from 'src/graph/contracts/compiled-scene-graph.interfaces';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import { NodeRuntimeState } from '../../state/node-runtime-state';
import { SceneRuntimeState } from '../../state/scene-runtime-state';
import { SceneBootstrapper } from '../../contracts/scene-bootsrapper.interface';
import { GraphReader } from 'src/graph/graph-core/contracts/graph-reader.interface';

@Injectable()
export class SceneBootstrapperService implements SceneBootstrapper {
  bootstrap(
    graph: GraphReader
  ): FlowRuntimeState {

    const entrySceneId =
      graph.entrySceneId()

    if (!entrySceneId) {
      throw new Error(
        `Bootstrap failed: missing entry scene ${graph.entrySceneId}`
      );
    }

    const nodeStates =
      this.createNodeStates(graph, entrySceneId);

    const sceneStates =
      this.createSceneStates(graph, entrySceneId);

   return {
  currentSceneId: entrySceneId,
  activeNodeId: null, // 👈 ADD THIS

  nodeStates,
  sceneStates
};
  }

  // ======================================================
  // NODE STATES (PURE SNAPSHOT)
  // ======================================================

  private createNodeStates(
    graph: GraphReader,
    activeSceneId: string
  ): ReadonlyMap<string, NodeRuntimeState> {

const nodeIds = graph.sceneNodeIds(activeSceneId);
const visibleSet = new Set(
  graph.sceneInitialVisibleNodeIds(activeSceneId)
);
const map = new Map<string, NodeRuntimeState>();
    for (const nodeId of nodeIds) {

    map.set(nodeId, {
    nodeId,

    visible: visibleSet.has(nodeId),

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
  graph: GraphReader,
  activeSceneId: string
): ReadonlyMap<string, SceneRuntimeState> {

  const map = new Map<string, SceneRuntimeState>();

  for (const sceneId of graph.sceneIds()) {

    map.set(sceneId, {
      sceneId,
      visited: sceneId === activeSceneId,
      completed: false
    });
  }

  return map;
}
}
