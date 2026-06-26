import { SceneEvent }
from 'src/core/events/types/scene-event.type';

export interface ExecutionCoordinator {

execute(event:SceneEvent): Promise<void>;

}