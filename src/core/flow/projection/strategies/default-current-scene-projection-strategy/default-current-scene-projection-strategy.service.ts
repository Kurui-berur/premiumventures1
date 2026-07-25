import { Injectable } from '@nestjs/common';
import { ProjectionSeedStrategy } from '../../contracts/strategies/projection-seed-strategy.interface';
import { ProjectionSession } from '../../context/projection-session.interface';
import { ProjectionSeed } from '../../context/state/projection-seed.interface';
import { ProjectionMode } from '../../types/projection-mode.type';
import { ProjectionScope } from '../../types/projection-scope.types';
import { ProjectionAnchorKind } from '../../types/projection-anchor-kind.type';


@Injectable()
export class DefaultCurrentSceneProjectionStrategyService implements ProjectionSeedStrategy {
   readonly mode = ProjectionMode.CURRENT_SCENE
    async create(session: ProjectionSession): Promise<ProjectionSeed> {

         const sceneId=await session.frame.runtime.currentSceneId()

         return {
            anchor:{
                kind:ProjectionAnchorKind.SCENE,
                id:sceneId
            },
            scope:ProjectionScope.ACTIVE_SCENE
         }
    }
}
