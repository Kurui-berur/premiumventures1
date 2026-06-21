export interface SceneLifecycle {

onSceneExit(
sceneId: string
): Promise<void>;

onSceneEnter(
sceneId: string
): Promise<void>;

}