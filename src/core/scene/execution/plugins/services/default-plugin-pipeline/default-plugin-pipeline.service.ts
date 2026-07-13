import {
  Inject,
  Injectable
} from '@nestjs/common';


import type {
  PluginRegistry
} from '../../../contracts/plugin-registry.interface';

import {
  EXECUTION_TRACKER,
  MIDDLEWARE_CHAIN,
  PLUGIN_EXECUTOR,
  PLUGIN_MIDDLEWARE,
  PLUGIN_REGISTRY
} from '../../../tokens/execution.tokens';

import type {
  ExecutionTracker
} from '../../../contracts/execution-tracker.interface';

import type {
  PluginExecutor
} from '../../../contracts/plugin-executor.interface';

import type {
  PluginPipeline
} from '../../../contracts/pipelines/plugin-pipeline.interface';

import type {
  MiddlewareChain
} from '../../../contracts/middlewares/middleware-chain.interface';

import type {
  PluginMiddleware
} from '../../../contracts/middlewares/plugin-middleware.interface';
import { ExecutionSession } from '../../../context/execution-context.class';
import { ExecutionScope } from '../../../types/execution-scope.type';

@Injectable()
export class DefaultPluginPipelineService
implements PluginPipeline {

  constructor(

    @Inject(
      PLUGIN_REGISTRY
    )
    private readonly registry:
      PluginRegistry,

    @Inject(
      EXECUTION_TRACKER
    )
    private readonly tracker:
      ExecutionTracker,

    @Inject(
      PLUGIN_EXECUTOR
    )
    private readonly executor:
      PluginExecutor,

    @Inject(
      MIDDLEWARE_CHAIN
    )
    private readonly middlewareChain:
      MiddlewareChain,

    @Inject(
      PLUGIN_MIDDLEWARE
    )
    private readonly middlewares:
      readonly PluginMiddleware[]

  ) {}
  readonly scope: ExecutionScope = ExecutionScope.PLUGIN;

  async execute(
    context: ExecutionSession
  ): Promise<void> {

    try {

      await this.tracker.pluginResolving(
        context
      );

      const plugin =
        await this.registry.resolve(
          context
        );

      context.state.recordPlugin(
        plugin
      );

      context.metadata.scope.enterScope(
        this.scope
      );

      await this.tracker.pluginResolved(
        context
      );

      await this.tracker.pluginStarted(
        context
      );

     try {

        const decision =
          await this.middlewareChain.execute(

            this.middlewares,

            (

              middleware,

              next

            ) =>

              middleware.execute(

                context,

                next

              ),

            async () =>

              this.executor.execute(

                context

              )

          );

        context.state.recordDecision(
          decision
        );

} finally {

  context.metadata.scope.leaveScope();

}

      await this.tracker.pluginCompleted(
        context
      );

    } catch (error) {

      await this.tracker.pluginFailed(

        context,

        error

      );

      throw error;

    }

  }

}