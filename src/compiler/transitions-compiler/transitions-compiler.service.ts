import { Injectable } from '@nestjs/common';
import { FlowTransition } from 'src/flow/types/flow-transitions';
import { SceneTransition } from 'src/graph/contracts/scene-transition.interface';

@Injectable()
export class TransitionsCompilerService {
    compile(
    transitions:
      readonly FlowTransition[]
  ): ReadonlyMap<
    string,
    readonly SceneTransition[]
  > {

    const grouped =
      new Map<
        string,
        SceneTransition[]
      >();

    for (const transition of transitions) {

      let list =
        grouped.get(
          transition.sourceSceneId
        );

      if (!list) {

        list = [];

        grouped.set(
          transition.sourceSceneId,
          list
        );
      }

      list.push({
        sourceSceneId:
          transition.sourceSceneId,

        targetSceneId:
          transition.targetSceneId,

        trigger:
          transition.trigger,

        condition:
          transition.condition ?? null
      });
    }

    return grouped;
  }
}
