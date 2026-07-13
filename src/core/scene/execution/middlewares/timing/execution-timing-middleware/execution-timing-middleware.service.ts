import { Injectable } from '@nestjs/common';
import { PluginMiddleware } from '../../../contracts/middlewares/plugin-middleware.interface';
import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionSession } from '../../../context/execution-context.class';

@Injectable()
export class ExecutionTimingMiddlewareService implements PluginMiddleware {
    async execute(context: ExecutionSession, next: () => Promise<PluginDecision>): Promise<PluginDecision> {
        
        const scope=context.metadata.scope.requireScope()


        try {
            return await next();
        }
        finally {
            const endedAt = Date.now();

            context.metadata.timing.recordTiming({
                scopeId: scope.id,
                endedAt,
                duration: endedAt - scope.startedAt
            });
        }
    }
}
