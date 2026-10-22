import { Inject, Injectable } from '@nestjs/common';
import { OperationResolver } from '../../contracts/decision/operation-resolver.interface';
import { ExecutionSession } from 'src/core/scene/execution/context/execution-session.class';
import { OperationHandler } from '../../contracts/decision/handler/operation-handler.interface';
import type { PluginRegistry } from '../../contracts/plugin-registry.interface';
import { PLUGIN_REGISTRY } from '../../tokens/plugins.tokens';

@Injectable()
export class DefaultOperationResolverService implements OperationResolver {
      
    constructor(

    @Inject(PLUGIN_REGISTRY)
    private readonly registry:PluginRegistry,

    ) {}

    async resolve(context: ExecutionSession): Promise<OperationHandler> {
        const plugin=context.state.requirePlugin()
    
        const decision=context.state.require
    }
}
