import { Inject, Injectable } from '@nestjs/common';
import { RuntimeCoordinator } from '../../contracts/runtime-coordinator.interface';
import { FlowRuntimeStatePatch } from '../../contracts/runtime-state-patch.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import { RUNTIME_SNAPSHOT_READER, RUNTIME_TRACKER, RUNTIME_WRITER } from '../../tokens/runtime-tokens';
import type { RuntimeWriter } from '../../contracts/runtime-writer.interface';
import type { RuntimeTracker } from '../../contracts/runtime-tracker.interface';
import { RUNTIME_CHECKPOINT } from 'src/core/scene/execution/tokens/execution.tokens';
import type { RuntimeCheckpointStore } from 'src/core/scene/execution/contracts/runtime-checkpoint-store.interface';
import type { RuntimeSnapshotReader } from '../../contracts/runtime-snapshot-reader.interface';
import { RuntimeMutation } from '../../types/runtime-mutation.type';

@Injectable()
export class DefaultRuntimeCoordinatorService implements RuntimeCoordinator{


    constructor(
        @Inject(RUNTIME_WRITER)
        private readonly writer:RuntimeWriter,

        @Inject(RUNTIME_TRACKER)
        private readonly tracker:RuntimeTracker,

        @Inject(RUNTIME_CHECKPOINT)
        private readonly checkpoint:RuntimeCheckpointStore,

        @Inject(RUNTIME_SNAPSHOT_READER)
        private readonly snapshot:RuntimeSnapshotReader,

        
    )
    {}

  async apply(flowInstanceId:string,mutation:RuntimeMutation): Promise<void> {

  switch (
    mutation.type
  ) {

    case 'REPLACE':

      await this.tracker
        .replaced(
          flowInstanceId,
          mutation.state
        );

      break;

    case 'PATCH':

      await this.tracker
        .patched(
          flowInstanceId,
          mutation.patch
        );

      break;

  }

  await this.writer
    .apply(
      mutation
    );

  const latest =
    await this.snapshot
      .snapshot();

  await this.checkpoint
    .save(
      latest
    );

}
    
}
