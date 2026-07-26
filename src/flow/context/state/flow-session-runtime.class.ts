import { NodeRuntimeState } from "src/core/flow/runtime/state/node-runtime-state";
import { SceneRuntimeState } from "src/core/flow/runtime/state/scene-runtime-state";

export class FlowSessionRuntime {

    constructor(

        readonly currentSceneId: string,

        readonly activeNodeId: string | null,

        readonly sceneStates: ReadonlyMap<string, SceneRuntimeState>,

        readonly nodeStates: ReadonlyMap<string, NodeRuntimeState>,

    ) {

        Object.freeze(this);

    }

}