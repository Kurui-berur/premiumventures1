import { CompiledScene } from "src/graph/contracts/compiled-scene.interfaces";
import { SceneTransition } from "src/graph/contracts/scene-transition.interface";
import { FlowNode } from "src/graph/types/flow-node.type";

export interface GraphReader {

entrySceneId():string
  /**
   * O(1)
   */
  getScene(
    sceneId: string,
  ): CompiledScene | undefined;

  /**
   * O(1)
   */
  hasScene(
    sceneId: string,
  ): boolean;

  /**
   * O(1)
   */
  entryScene(): CompiledScene;

  /**
   * O(1) lookup
   * O(k) to iterate returned transitions,
   * where k = outgoing transitions for this scene.
   */
  outgoing(
    sceneId: string,
  ): readonly SceneTransition[];


  
   node(
    nodeId: string,
  ): FlowNode | undefined;



  ownerSceneId(
    nodeId: string,
  ): string | undefined;
  
  sceneIds(): readonly string[];

  sceneNodeIds(sceneId: string): readonly string[];

  sceneInitialVisibleNodeIds(sceneId: string): readonly string[];
}