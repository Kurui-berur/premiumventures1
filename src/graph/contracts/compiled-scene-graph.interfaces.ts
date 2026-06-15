import { FlowNode } from "../types/flow-node.type";
import { CompiledScene } from "./compiled-scene.interfaces";



export interface CompiledSceneGraph {

  entrySceneId: string;

  scenes:
    ReadonlyMap<string, CompiledScene>;

  nodeToScene:
    ReadonlyMap<string, string>;

  nodeLookup:
    ReadonlyMap<string, FlowNode>;
    
}