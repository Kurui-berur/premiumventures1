
import { Middleware } from 'src/core/scene/execution/contracts/middlewares/middleware.interface';
import { ProjectionSession } from '../../context/projection-session.interface';

export interface ProjectionMiddleware
extends Middleware {

    execute<TResult>(
        session: ProjectionSession,
        next: () => Promise<TResult>,
    ): Promise<TResult>;

}