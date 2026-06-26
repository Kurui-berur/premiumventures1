import { Inject, Injectable } from '@nestjs/common';
import { RuntimeCoordinator } from '../../contracts/runtime-coordinator.interface';
import { FlowRuntimeStatePatch } from '../../contracts/runtime-state-patch.interface';
import { FlowRuntimeState } from '../../state/flow-runtime-state';
import { RUNTIME_TRACKER, RUNTIME_WRITER } from '../../tokens/runtime-tokens';
import type { RuntimeWriter } from '../../contracts/runtime-writer.interface';
import type { RuntimeTracker } from '../../contracts/runtime-tracker.interface';
import { RUNTIME_CHECKPOINT } from 'src/core/scene/execution/tokens/execution.tokens';
import type { RuntimeCheckpointStore } from 'src/core/scene/execution/contracts/runtime-checkpoint-store.interface';

@Injectable()
export class DefaultRuntimeCoordinatorService implements RuntimeCoordinator{


    constructor(
        @Inject(RUNTIME_WRITER)
        private readonly writer:RuntimeWriter,

        @Inject(RUNTIME_TRACKER)
        private readonly tracker:RuntimeTracker,

        @Inject(RUNTIME_CHECKPOINT)
        private readonly checkpoint:RuntimeCheckpointStore
    )
    {}

    async replace(flowId: string, state: FlowRuntimeState): Promise<void> {

        await  this.tracker.replaced(flowId,state),

        await this.writer.update(state),

        await this.checkpoint.save(state)
      
    }
    async patch(flowId: string, patch: FlowRuntimeStatePatch): Promise<void> {
        
        await this.tracker.patched(flowId,patch),

        await this.writer.updatePatch(patch)

    }

    
}
