import { SceneEvent }
from '../../../events/types/scene-event.type';

export interface ExecutionQueue {

enqueue(event: SceneEvent): Promise<void>;

}