import { CompiledScene } from 'src/graph/contracts/compiled-scene.interfaces';
import { FlowNode } from 'src/graph/types/flow-node.type';

export interface ProjectionGraph {

    /**
     * O(1)
     */
    hasScene(
        sceneId: string,
    ): boolean;

    /**
     * O(1)
     */
    scene(
        sceneId: string,
    ): CompiledScene | undefined;

    /**
     * Projection root.
     */
    rootSceneId(): string;

    /**
     * Participating scenes.
     */
    sceneIds(): readonly string[];

    /**
     * O(1)
     */
    sceneNodeIds(
        sceneId: string,
    ): readonly string[];

    /**
     * O(1)
     */
    node(
        nodeId: string,
    ): FlowNode | undefined;

    /**
     * O(1)
     */
    ownerSceneId(
        nodeId: string,
    ): string | undefined;

}