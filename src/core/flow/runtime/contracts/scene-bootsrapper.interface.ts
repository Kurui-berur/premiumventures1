import { CompiledSceneGraph } from "src/graph/contracts/compiled-scene-graph.interfaces";
import { FlowRuntimeState } from "../state/flow-runtime-state";
import { GraphReader } from "src/graph/graph-core/contracts/graph-reader.interface";

export interface SceneBootstrapper {

  bootstrap(compiledscenegrapph:GraphReader): FlowRuntimeState;

}