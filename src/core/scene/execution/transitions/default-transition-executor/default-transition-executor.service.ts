import { Inject, Injectable } from '@nestjs/common';
import { TransitionExecutor } from '../../contracts/transition-executor.interface';
import type { RuntimeWriter } from 'src/core/flow/runtime/contracts/runtime-writer.interface';
import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionFrame } from '../../contracts/execution-frame.interface';
import { SCENE_ACTIVATOR, SCENE_LIFECYCLE } from '../../tokens/execution.tokens';
import type { SceneActivator } from '../../contracts/scene-activator.interface';
import type { SceneLifecycle } from '../../contracts/scene-lifecycle.interface';
import { RUNTIME_COORDINATOR, RUNTIME_PATCH_BUILDER, RUNTIME_WRITER } from 'src/core/flow/runtime/tokens/runtime-tokens';
import type { RuntimePatchBuilder } from 'src/core/flow/runtime/contracts/runtime-patch-bulder.interface';
import type { RuntimeCoordinator } from 'src/core/flow/runtime/contracts/runtime-coordinator.interface';

@Injectable()
export class DefaultTransitionExecutorService  implements TransitionExecutor {

    constructor(
        @Inject(RUNTIME_COORDINATOR)
        private readonly runtime:RuntimeCoordinator,

        @Inject(RUNTIME_PATCH_BUILDER)
        private readonly patches:RuntimePatchBuilder,

        @Inject(SCENE_ACTIVATOR)
        private readonly activator:SceneActivator,

        @Inject(SCENE_LIFECYCLE)
        private readonly lifecycle:SceneLifecycle

    ){}

    async execute(frame: ExecutionFrame, decision: PluginDecision): Promise<void> {
        
        const transition=decision.transitions?.[0];

        if(!transition){
            return
        }

        const current=frame.state.currentSceneId;

        if(current===transition.targetSceneId){
            return
        }

        await this.lifecycle.onSceneEnter(current!)

        const next= await this.activator.activate(frame.state,transition.targetSceneId)

        const patch=this.patches.sceneTransition(frame.state,next)

        await this.runtime.patch(frame.flowId,patch)

        await this.lifecycle.onSceneExit(transition.targetSceneId)
    }

}
