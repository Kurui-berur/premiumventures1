import { Injectable } from '@nestjs/common';
import { SceneLifecycle } from '../../contracts/scene-lifecycle.interface';

@Injectable()
export class DefaultSceneLifecycleService implements SceneLifecycle {

    async onSceneEnter(sceneId: string): Promise<void> {
        console.log('[SCENE ENTER]',sceneId)
    }

    async onSceneExit(sceneId: string): Promise<void> {
        console.log('[SCENE EXITED]',sceneId)
    }
}
