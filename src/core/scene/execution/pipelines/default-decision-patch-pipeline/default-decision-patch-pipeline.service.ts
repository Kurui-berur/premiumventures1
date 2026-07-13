import { Injectable, Inject } from "@nestjs/common";
import type { DecisionPatchExecutor } from "../../contracts/decision-patch-executor.interface";
import type { ExecutionTracker } from "../../contracts/execution-tracker.interface";
import { DecisionPatchMiddleware } from "../../contracts/middlewares/decision-patch-middleware.interface";
import type { MiddlewareChain } from "../../contracts/middlewares/middleware-chain.interface";
import { DecisionPatchPipeline } from "../../contracts/pipelines/decision-patch-pipeline.interface";
import { DECISION_PATCH_EXECUTOR, EXECUTION_TRACKER, MIDDLEWARE_CHAIN } from "../../tokens/execution.tokens";
import { DECISION_PATCH_MIDDLEWARE } from "../../tokens/middlewares/tokens-middlewares";
import { ExecutionSession } from "../../context/execution-context.class";
import { ExecutionScope } from "../../types/execution-scope.type";


@Injectable()
export class DefaultDecisionPatchPipelineService
implements DecisionPatchPipeline {

  constructor(

    @Inject(
      DECISION_PATCH_EXECUTOR
    )
    private readonly executor:
      DecisionPatchExecutor,

    @Inject(
      EXECUTION_TRACKER
    )
    private readonly tracker:
      ExecutionTracker,

    @Inject(
      MIDDLEWARE_CHAIN
    )
    private readonly middlewareChain:
      MiddlewareChain,

    @Inject(
      DECISION_PATCH_MIDDLEWARE
    )
    private readonly middlewares:
      readonly DecisionPatchMiddleware[]

  ) {}
    readonly scope: ExecutionScope=ExecutionScope.DECISION_PATCH

  async execute(
    context: ExecutionSession
  ): Promise<void> {

     context.metadata.scope.enterScope(this.scope)

    try {

      await this.tracker.patchStarted(
        context
      );

     

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

     

      

      await this.tracker.patchCompleted(

        context

      );

    } catch (error) {

      await this.tracker.patchFailed(

        context,

        error

      );

      throw error;

    }
    finally{
      
      context.metadata.scope.leaveScope();
      
    }

  }

}