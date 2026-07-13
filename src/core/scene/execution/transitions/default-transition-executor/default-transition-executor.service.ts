
import { Inject, Injectable } from '@nestjs/common';

import { TransitionExecutor }
from '../../contracts/transition-executor.interface';

import { PluginDecision }
from 'src/core/plugins/contracts/plugin-decision.interface';

import { ExecutionFrame }
from '../../contracts/execution-frame.interface';

import {
SCENE_ACTIVATOR,
SCENE_LIFECYCLE
}
from '../../tokens/execution.tokens';

import type {
SceneActivator
}
from '../../contracts/scene-activator.interface';

import type {
SceneLifecycle
}
from '../../contracts/scene-lifecycle.interface';

import type {
RuntimePatchBuilder
}
from 'src/core/flow/runtime/contracts/runtime-patch-bulder.interface';

import {
RUNTIME_PATCH_BUILDER
}
from 'src/core/flow/runtime/tokens/runtime-tokens';

import {
RuntimeMutation
}
from 'src/core/flow/runtime/types/runtime-mutation.type';
import { ExecutionSession } from '../../context/execution-context.class';

@Injectable()
export class DefaultTransitionExecutorService
implements TransitionExecutor {

constructor(

@Inject(
SCENE_ACTIVATOR
)

private readonly activator:
SceneActivator,

@Inject(
SCENE_LIFECYCLE
)

private readonly lifecycle:
SceneLifecycle

){}

async execute(
context:ExecutionSession

): Promise<void> {

    const runtime= context.runtime.current()

    const decision=context.state.requireDecision()

    const transition = decision.transitions?.[0];

    if (
    !transition
    ) {
    return ;
    }

    const current =
    runtime.currentSceneId;

    if (
    current ===
    transition.targetSceneId
    ) {
    return ;
    }

    /*
    Current scene exits
    */

    if (
    current
    ) {

    await this.lifecycle
    .onSceneExit(
    current
    );

    }

    /*
    Compute next runtime
    */

    const next =
    await this.activator
    .activate(

    runtime,

    transition
    .targetSceneId

    );

    /*
    Target scene enters
    */

    await this.lifecycle
    .onSceneEnter(

    transition
    .targetSceneId

    );

    /*
    Build runtime mutation
    */

   context.runtime.replace(next);

}
}
