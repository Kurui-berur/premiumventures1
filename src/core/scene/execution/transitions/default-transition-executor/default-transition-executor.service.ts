import { Inject, Injectable } from '@nestjs/common';
import { TransitionExecutor } from '../../contracts/transition-executor.interface';
import type { RuntimeWriter } from 'src/core/flow/runtime/contracts/flow-writer.interface';
import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionFrame } from '../../contracts/execution-frame.interface';
import { SCENE_ACTIVATOR, SCENE_LIFECYCLE } from '../../tokens/execution.tokens';
import type { SceneActivator } from '../../contracts/scene-activator.interface';
import type { SceneLifecycle } from '../../contracts/scene-lifecycle.interface';

@Injectable()
export class DefaultTransitionExecutorService  implements TransitionExecutor {

    constructor(
        private readonly runtime:RuntimeWriter,

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

        if(current===frame.state.currentSceneId){
            return
        }

        await this.lifecycle.onSceneEnter(current!)

        const next= await this.activator.activate(frame.state,transition.sourceSceneId)

        await this.runtime.update(next)

        await this.lifecycle.onSceneExit(transition.targetSceneId)
    }

}
