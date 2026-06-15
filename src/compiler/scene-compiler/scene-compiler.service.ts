import { Injectable } from '@nestjs/common';
import { SceneBulderService } from '../scene-bulder/scene-bulder.service';
import { CompiledScene } from 'src/graph/contracts/compiled-scene.interfaces';
import { FlowNode } from 'src/graph/types/flow-node.type';
import { SceneTransition } from 'src/graph/contracts/scene-transition.interface';

@Injectable()
export class SceneCompilerService {
    constructor(
    private readonly builder: SceneBulderService
  ) {}

  compile(
    nodes: readonly FlowNode[],
    
    transitionsByScene: ReadonlyMap<
     string,
      readonly SceneTransition[]
    >
  ): Map<string, CompiledScene> {

    const grouped =
      this.groupByScene(nodes);

    const scenes =
      new Map<string, CompiledScene>();

    for (const [sceneId, sceneNodes] of grouped.entries()) {

      const sceneTransitions =
        transitionsByScene.get(sceneId) ?? [];

      scenes.set(
        sceneId,
        this.builder.build(
          sceneId,
          sceneNodes,
          sceneTransitions
        )
      );
    }

    return scenes;
  }

  // ======================================================
  // INTERNAL: GROUP NODES BY SCENE
  // ======================================================
  private groupByScene(
    nodes: readonly FlowNode[]
  ): Map<string, FlowNode[]> {

    const grouped =
      new Map<string, FlowNode[]>();

    for (const node of nodes) {
//if group already exists, get it, 
      let list =
        grouped.get(node.sceneId);
//otherwise create a new one and set it in the map
      if (!list) {
        list = [];
        grouped.set(node.sceneId, list);
      }

      list.push(node);
    }

    return grouped;
  }}
