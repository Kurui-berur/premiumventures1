import { Injectable } from '@nestjs/common';
import { CompiledSceneGraph } from 'src/graph/contracts/compiled-scene-graph.interfaces';

@Injectable()
export class GraphValidatorService {
     validate(graph: CompiledSceneGraph): void {

    this.validateEntryScene(graph);

    this.validateDuplicateNodeOwnership(graph);

    this.validateTransitionTargets(graph);
  }

  // ======================================================
  // ENTRY SCENE VALIDATION
  // ======================================================
  private validateEntryScene(graph: CompiledSceneGraph): void {

    const exists =
      graph.scenes.has(graph.entrySceneId);

    if (!exists) {
      throw new Error(
        `[FlowGraph] Missing entry scene: ${graph.entrySceneId}`
      );
    }
  }

  // ======================================================
  // DUPLICATE NODE OWNERSHIP
  // ======================================================
  private validateDuplicateNodeOwnership(graph: CompiledSceneGraph): void {

    const ownership = new Map<string, string>();

    for (const scene of graph.scenes.values()) {

      for (const nodeId of scene.nodeIds) {

        const existing = ownership.get(nodeId);
//if node is already assigned throw an error
        if (existing) {

          throw new Error(
            `[FlowGraph] Node "${nodeId}" belongs to multiple scenes: "${existing}" and "${scene.id}"`
          );
        }

        ownership.set(nodeId, scene.id);
      }
    }
  }

  // ======================================================
  // TRANSITION TARGET VALIDATION
  // ======================================================
  private validateTransitionTargets(graph: CompiledSceneGraph): void {

    const sceneIndex = new Set(graph.scenes.keys());

    for (const scene of graph.scenes.values()) {

      for (const transition of scene.transitions) {

        if (!sceneIndex.has(transition.targetSceneId)) {

          throw new Error(
            `[FlowGraph] Invalid transition target "${transition.targetSceneId}" from scene "${scene.id}"`
          );
        }
      }
    }
  }
}
