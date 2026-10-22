import { SceneEvent }
from 'src/core/events/types/scene-event.type';
import { ExecutionSession } from '../../context/execution-session.class';
import { ExecutionRequest } from '../../context/contracts/execution-request.interface';

export interface ExecutionCoordinator {

execute(request:ExecutionRequest): Promise<ExecutionSession>;

}