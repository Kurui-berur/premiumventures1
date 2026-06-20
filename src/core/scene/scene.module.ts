import { Module } from '@nestjs/common';
import { LogsModule } from './execution/logs/logs.module';
import { SceneProcessor } from './execution/processor/scene-processor/scene-processor.service';
import { DefaultExecutionFrameFactory } from './execution/factories/execution-frame.factory';
import { SceneEventIntakeHandler } from './execution/handlers/scene-event-intake.handler';
import { ExecutionJournalStore } from './execution/logs/execution-journal.store';
import { ExecutionFrameFactory } from './execution/contracts/execution-frame-factory.interface';
import { EXECUTION_FRAME_FACTORY, EXECUTION_JOURNAL, EXECUTION_TRACKER } from './execution/tokens/execution.tokens';
import { DefaultExecutionTrackerService } from './execution/tracking/default-execution-tracker/default-execution-tracker.service';
import { DecisionApplierService } from './execution/appliers/decision-applier/decision-applier.service';
@Module({
  imports: [LogsModule],
  providers: [

SceneProcessor,SceneEventIntakeHandler,

DefaultExecutionFrameFactory,

ExecutionJournalStore,

DefaultExecutionTrackerService,

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

DecisionApplierService

]
})
export class SceneModule {}
