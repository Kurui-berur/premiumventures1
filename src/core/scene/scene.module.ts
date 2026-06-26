import { Module } from '@nestjs/common';
import { LogsModule } from './execution/logs/logs.module';
import { SceneProcessor } from './execution/processor/scene-processor/scene-processor.service';
import { DefaultExecutionFrameFactory } from './execution/factories/execution-frame.factory';
import { SceneEventIntakeHandler } from './execution/handlers/scene-event-intake.handler';
import { ExecutionJournalStore } from './execution/logs/execution-journal.store';
import { ExecutionFrameFactory } from './execution/contracts/execution-frame-factory.interface';
import { DECISION_PATCH_EXECUTOR, EXECUTION_COORDINATOR, EXECUTION_FRAME_FACTORY, EXECUTION_JOURNAL, EXECUTION_MIDDLEWARE, EXECUTION_QUEUE, EXECUTION_TRACKER, EXECUTION_TRANSACTION, RUNTIME_CHECKPOINT, SCENE_ACTIVATOR, SCENE_LIFECYCLE, TRANSITION_EXECUTOR } from './execution/tokens/execution.tokens';
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
@Module({
  imports: [LogsModule],
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





]
})
export class SceneModule {}
