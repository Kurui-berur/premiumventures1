import { Inject, Injectable } from '@nestjs/common';
import { ExecutionTracker } from '../../contracts/execution-tracker.interface';
import { SceneEvent } from 'src/core/events/types/scene-event.type';
import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { ExecutionFrame } from '../../contracts/execution-frame.interface';
import type { ExecutionJournal } from '../../contracts/execution-journal.interface';
import { EXECUTION_JOURNAL } from '../../tokens/execution.tokens';

@Injectable()
export class DefaultExecutionTrackerService implements ExecutionTracker {
   constructor(

@Inject(
EXECUTION_JOURNAL
)

private readonly journal:
ExecutionJournal

){}

async event(
event
){

await this.journal.record({

executionId:
'pending',

flowId:
'unknown',

stage:
'EVENT_RECEIVED',

timestamp:
Date.now(),

payload:
event

});

}

async frame(
frame
){

await this.journal.record({

executionId:
frame.executionId,

flowId:
frame.flowId,

stage:
'FRAME_CREATED',

timestamp:
frame.timestamp,

payload:
frame

});

}

async decision(
frame,
decision
){

await this.journal.record({

executionId:
frame.executionId,

flowId:
frame.flowId,

stage:
'PLUGIN_COMPLETED',

timestamp:
Date.now(),

payload:
decision

});

}
}
