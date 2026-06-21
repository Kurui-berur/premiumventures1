import { Inject, Injectable } from '@nestjs/common';
import { DecisionApplier } from '../../contracts/decision-applier.interface';
import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionFrame } from '../../contracts/execution-frame.interface';
import type { RuntimeWriter } from 'src/core/flow/runtime/contracts/flow-writer.interface';
import type { TransitionExecutor } from '../../contracts/transition-executor.interface';
import { RUNTIME_CHECKPOINT, TRANSITION_EXECUTOR } from '../../tokens/execution.tokens';
import type { RuntimeCheckpointStore } from '../../contracts/runtime-checkpoint-store.interface';

@Injectable()
export class DefaultDecisionApplier implements DecisionApplier {

    constructor(
        private readonly runtime:RuntimeWriter,

        @Inject(TRANSITION_EXECUTOR)
        private readonly transitions:TransitionExecutor,

        @Inject(RUNTIME_CHECKPOINT)
        private readonly checkpoint:RuntimeCheckpointStore

    ){}

   async apply(
  frame: ExecutionFrame,
  decision: PluginDecision
): Promise<void> {

  // clone immutable snapshot

  const nodeStates =
    new Map(
      frame.state.nodeStates
    );

  const sceneStates =
    new Map(
      frame.state.sceneStates
    );

  // apply node patches

decision
  .nodeStatePatch
  ?.forEach(
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

          ...patch,

          // preserve required field
          nodeId:
            current.nodeId

        }
      );

    }
  );

  // apply scene patches

decision
  .sceneStatePatch
  ?.forEach(
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

          ...patch,

          sceneId:
            current.sceneId

        }
      );

    }
  );

  // build new runtime state

  const nextState = {

    ...frame.state,

    nodeStates,

    sceneStates

  };

  await this.runtime .update(nextState);

  await this.transitions.execute(frame,decision)

  await  this.checkpoint.save(nextState)

}

}