import { Inject, Injectable } from '@nestjs/common';
import { ProjectionRuntimeReader } from '../../contracts/reader/projection-runtime-reader.interface';
import { NodeRuntimeState } from '../../state/node-runtime-state';
import { SceneRuntimeState } from '../../state/scene-runtime-state';
import { RUNTIME_STATE_READER } from '../../tokens/readers/readers-tokens';
import type { RuntimeStateReader } from '../../contracts/runtime-state-reader.interface';

@Injectable()
export class DefaultProjectionRuntimeService implements ProjectionRuntimeReader {

    constructor(

        @Inject(RUNTIME_STATE_READER)
        private readonly runtime:RuntimeStateReader
    )
    {}

    private state() {

  return this.runtime.state();

}

    currentSceneId(): string {

    return this.state().currentSceneId;

  }

  activeNodeId(): string | null {

    return this.state().activeNodeId;

  }

  nodeState(
    nodeId: string
  ): NodeRuntimeState | undefined {

    return this.state().nodeStates.get(nodeId);

  }

  sceneState(sceneId: string): SceneRuntimeState | undefined {

    return this.state().sceneStates.get(sceneId);

  }

}
