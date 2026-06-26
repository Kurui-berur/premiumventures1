import { ExecutionFrame }
from './execution-frame.interface';

export interface ExecutionMiddleware {

execute<TResult>(frame: ExecutionFrame,
    next: () => Promise<TResult>): Promise<TResult>;

}