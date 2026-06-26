import { Inject, Injectable } from '@nestjs/common';
import { DecisionPatchExecutor } from '../../../contracts/decision-patch-executor.interface';
import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionFrame } from '../../../contracts/execution-frame.interface';
import type { RuntimeWriter } from 'src/core/flow/runtime/contracts/runtime-writer.interface';
import { RUNTIME_WRITER } from 'src/core/flow/runtime/tokens/runtime-tokens';
import { map } from 'rxjs';

@Injectable()
export class DefaultDecisionPatchExecutorService implements DecisionPatchExecutor{

    constructor(
        @Inject(RUNTIME_WRITER)
        private readonly runtime:RuntimeWriter
    ){

    }                  

   async execute(frame: ExecutionFrame, decision: PluginDecision): Promise<void> {

               // Mutable working copies
    const nodeStates =
      new Map(
        frame.state.nodeStates
      );

    const sceneStates =
      new Map(
        frame.state.sceneStates
      );

    /*
    --------------------
    NODE PATCHES
    --------------------
    */

    decision.nodeStatePatch?.forEach(
      (
        patch,
        nodeId
      ) => {

        const current =
          nodeStates.get(
            nodeId
          );

        if (!current) {
          return;
        }

        nodeStates.set(
          nodeId,
          {
            ...current,
            ...patch
          }
        );

      }
    );

    /*
    --------------------
    SCENE PATCHES
    --------------------
    */

    decision.sceneStatePatch?.forEach(
      (
        patch,
        sceneId
      ) => {

        const current =
          sceneStates.get(
            sceneId
          );

        if (!current) {
          return;
        }

        sceneStates.set(
          sceneId,
          {
            ...current,
            ...patch
          }
        );

      }
    );

    await this.runtime.update({

      ...frame.state,

      nodeStates,

      sceneStates

    });

  }
}
