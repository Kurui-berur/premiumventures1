import { Module } from '@nestjs/common';
import { LogsModule } from './execution/logs/logs.module';
import { SceneProcessor } from './execution/processor/scene-processor/scene-processor.service';
import { DefaultExecutionFrameFactory } from './execution/factories/execution-frame.factory';
import { SceneEventIntakeHandler } from './execution/handlers/scene-event-intake.handler';
import { ExecutionJournalStore } from './execution/logs/execution-journal.store';
import { ExecutionFrameFactory } from './execution/contracts/execution-frame-factory.interface';
import { DECISION_PATCH_EXECUTOR, EXECUTION_COORDINATOR, EXECUTION_DEDUPLICATOR, EXECUTION_FRAME_FACTORY, EXECUTION_JOURNAL, EXECUTION_MIDDLEWARE, EXECUTION_QUEUE, EXECUTION_TRACKER, EXECUTION_TRANSACTION, RUNTIME_CHECKPOINT, SCENE_ACTIVATOR, SCENE_LIFECYCLE, TRANSITION_EXECUTOR } from './execution/tokens/execution.tokens';
import { DefaultExecutionTrackerService } from './execution/tracking/default-execution-tracker/default-execution-tracker.service';
import { DefaultTransitionExecutorService } from './execution/transitions/default-transition-executor/default-transition-executor.service';
import { DefaultSceneActivatorService } from './execution/transitions/default-scene-activator/default-scene-activator.service';
import { DefaultSceneLifecycleService } from './execution/lifecycle/default-scene-lifecycle/default-scene-lifecycle.service';
import { DefaultExecutionQueueService } from './execution/queue/default-execution-queue/default-execution-queue.service';
import { DefaultExecutionReplayService } from './execution/replay/default-execution-replay/default-execution-replay.service';
import { InMemoryCheckpointStore} from './execution/checkpoints/in-memory-checkpoints/in-memory-checkpoints.service';
import { DefaultExecutionTransactionService } from './execution/transactions/default-execution-transaction/default-execution-transaction.service';
import { ExecutionMiddlewarePipelineService } from './execution/services/execution-middleware-pipeline/execution-middleware-pipeline.service';
import { ExecutionLoggingMiddlewareService } from './execution/middlewares/execution-logging-middleware/execution-logging-middleware.service';
import { DefaultExecutionCoordinatorService } from './execution/coordinator/default-execution-coordinator/default-execution-coordinator.service';
import { DefaultDecisionPatchExecutorService } from './execution/services/decision-patch/default-decision-patch-executor/default-decision-patch-executor.service';
import { BullExecutionQueueService } from './execution/queue/bull-execution-queue/bull-execution-queue.service';
import { InMemoryExecutionDeduplicatorService } from './execution/deduplicator/in-memory-execution-deduplicator/in-memory-execution-deduplicator.service';
import { DefaultExecutionIdGeneratorService } from './execution/services/default-execution-id-generator/default-execution-id-generator.service';

import { DefaultPluginRegistryService } from './execution/services/default-plugin-registry/default-plugin-registry.service';

import { PluginsModule } from '../plugins/plugins.module';
import { DefaultPluginPipelineService } from './execution/plugins/services/default-plugin-pipeline/default-plugin-pipeline.service';
import { DefaultMiddlewareChainService } from './execution/middlewares/services/default-middleware-chain/default-middleware-chain.service';
import { DefaultExecutionContextFactoryService } from './execution/context/factory/default-execution-session-factory/default-execution-session-factory.service';
import { ExecutionTimingMiddlewareService } from './execution/middlewares/timing/execution-timing-middleware/execution-timing-middleware.service';
import { DefaultDecisionPatchPipelineService } from './executionpipelines/default-decision-patch-pipeline/default-decision-patch-pipeline.service';
import { DefaultDecisionPatchPipelineService } from './execution/pipelines/default-decision-patch-pipeline/default-decision-patch-pipeline.service';
import { DefaultRuntimePipelineService } from './execution/pipelines/default-runtime-pipeline/default-runtime-pipeline.service';
import { DefaultTransitionPipelineService } from './execution/pipelines/default-transition-pipeline/default-transition-pipeline.service';
import { DefaultRuntimeDiffPipelineService } from './execution/pipelines/default-runtime-diff-pipeline/default-runtime-diff-pipeline.service';
import { DefaultExecutionCommitPipelineService } from './execution/pipelines/default-execution-commit-pipeline/default-execution-commit-pipeline.service';
import { DefaultExecutionPipelineRunnerService } from './execution/runners/default-execution-pipeline-runner/default-execution-pipeline-runner.service';
import { EXECUTION_SESSION_FACTORY } from './execution/tokens/factories/execution-factories.tokens';
import { DefaultExecutionMetadataFactoryService } from './execution/context/factory/default-execution-metadata-factory/default-execution-metadata-factory.service';
import { DefaultExecutionStateFactoryService } from './execution/context/factory/default-execution-state-factory/default-execution-state-factory.service';
import { DefaultExecutionRuntimeFactoryService } from './execution/context/factory/default-execution-runtime-factory/default-execution-runtime-factory.service';
@Module({
  imports: [LogsModule,PluginsModule],
  providers: [

SceneProcessor,SceneEventIntakeHandler,

DefaultExecutionFrameFactory,


DefaultTransitionExecutorService,

ExecutionJournalStore,

DefaultExecutionTrackerService,

DefaultTransitionExecutorService,

DefaultSceneActivatorService,

DefaultSceneLifecycleService,

DefaultExecutionQueueService,

InMemoryCheckpointStore,

DefaultExecutionTransactionService,

DefaultExecutionCoordinatorService,

DefaultDecisionPatchExecutorService,

InMemoryExecutionDeduplicatorService,

{

provide:
EXECUTION_DEDUPLICATOR,

useExisting:
InMemoryExecutionDeduplicatorService

},

{
  provide:
    DECISION_PATCH_EXECUTOR,

  useExisting:
    DefaultDecisionPatchExecutorService
},

{
provide:
EXECUTION_COORDINATOR,

useExisting:
  DefaultExecutionCoordinatorService
},

{
provide:
EXECUTION_MIDDLEWARE,

useFactory:(

logging

)=>

[

logging

],

inject:[

  ExecutionLoggingMiddlewareService

]
},

{
provide:
EXECUTION_TRANSACTION,

useExisting:
  DefaultExecutionTransactionService
},

{
provide:
RUNTIME_CHECKPOINT,

useExisting:
InMemoryCheckpointStore
},

{
provide:
EXECUTION_QUEUE,

useExisting:
  DefaultExecutionQueueService
},

{
provide:
SCENE_LIFECYCLE,

useExisting:
  DefaultSceneLifecycleService
}
,
{
provide:
SCENE_ACTIVATOR,

useExisting:
  DefaultSceneActivatorService
}
,
{
provide:
TRANSITION_EXECUTOR,

useExisting:
  DefaultTransitionExecutorService
},

{
  provide:
    EXECUTION_FRAME_FACTORY,

  useExisting:
    DefaultExecutionFrameFactory
},

{
  provide:
    EXECUTION_JOURNAL,

  useExisting:
    ExecutionJournalStore
},

{
provide:
EXECUTION_TRACKER,

useExisting:
DefaultExecutionTrackerService
},
{
  provide: EXECUTION_SESSION_FACTORY,
  useClass: DefaultExecutionSessionFactory
}

DefaultSceneActivatorService,

DefaultSceneLifecycleService,

DefaultExecutionQueueService,

DefaultExecutionReplayService,

DefaultExecutionTransactionService,

ExecutionMiddlewarePipelineService,

ExecutionLoggingMiddlewareService,

DefaultExecutionCoordinatorService,

DefaultDecisionPatchExecutorService,

BullExecutionQueueService,

InMemoryExecutionDeduplicatorService,

DefaultExecutionIdGeneratorService,

DefaultPluginRegistryService,

DefaultPluginPipelineService,

DefaultPluginPipelineService,

DefaultMiddlewareChainService,
, DefaultExecutionContextFactoryService, ExecutionTimingMiddlewareService, DefaultDecisionPatchPipelineService, DefaultRuntimePipelineService, DefaultTransitionPipelineService, DefaultRuntimeDiffPipelineService, DefaultExecutionCommitPipelineService, DefaultExecutionPipelineRunnerService, DefaultExecutionMetadataFactoryService, DefaultExecutionStateFactoryService, DefaultExecutionRuntimeFactoryService,

]
})
export class SceneModule {}
