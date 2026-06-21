import { Module } from '@nestjs/common';
import { LogsModule } from './execution/logs/logs.module';
import { SceneProcessor } from './execution/processor/scene-processor/scene-processor.service';
import { DefaultExecutionFrameFactory } from './execution/factories/execution-frame.factory';
import { SceneEventIntakeHandler } from './execution/handlers/scene-event-intake.handler';
import { ExecutionJournalStore } from './execution/logs/execution-journal.store';
import { ExecutionFrameFactory } from './execution/contracts/execution-frame-factory.interface';
import { EXECUTION_FRAME_FACTORY, EXECUTION_JOURNAL, EXECUTION_QUEUE, EXECUTION_TRACKER, RUNTIME_CHECKPOINT, SCENE_ACTIVATOR, SCENE_LIFECYCLE, TRANSITION_EXECUTOR } from './execution/tokens/execution.tokens';
import { DefaultExecutionTrackerService } from './execution/tracking/default-execution-tracker/default-execution-tracker.service';
import { DefaultTransitionExecutorService } from './execution/transitions/default-transition-executor/default-transition-executor.service';
import { DefaultSceneActivatorService } from './execution/transitions/default-scene-activator/default-scene-activator.service';
import { DefaultSceneLifecycleService } from './execution/lifecycle/default-scene-lifecycle/default-scene-lifecycle.service';
import { DefaultExecutionQueueService } from './execution/queue/default-execution-queue/default-execution-queue.service';
import { DefaultExecutionReplayService } from './execution/replay/default-execution-replay/default-execution-replay.service';
import { InMemoryCheckpointStore} from './execution/checkpoints/in-memory-checkpoints/in-memory-checkpoints.service';
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





]
})
export class SceneModule {}
