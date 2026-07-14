import { PluginDecision } from 'src/core/plugins/contracts/plugin-decision.interface';
import { SceneEvent }
from '../../../events/types/scene-event.type';

import { ExecutionFrame }from './execution-frame.interface';
import { ExecutionSession } from '../context/execution-context.class';




export interface ExecutionTracker {

  event(event: SceneEvent): Promise<void>;

  frame( context: ExecutionSession): Promise<void>;

  decision(context: ExecutionSession): Promise<void>;


/**
 * Event entered queue
 */
queued(
event: SceneEvent
): Promise<void>;


//transactions

transactionStarted(frame:ExecutionFrame):Promise<void>

transactionCompleted(frame:ExecutionFrame):Promise<void>

transactionFailed(frame:ExecutionFrame,error):Promise<void>

rollback(frame:ExecutionFrame):Promise<void>

//PLUGIN TRACKING
// PLUGIN TRACKING
pluginStarted(context: ExecutionSession)
: Promise<void>;

  context: ExecutionSession   
pluginResolving(
  context: ExecutionSession
): Promise<void>;

pluginResolved(
  context: ExecutionSession
): Promise<void>;

pluginCompleted(
  context: ExecutionSession
): Promise<void>;

pluginFailed(
  context: ExecutionSession,
  error: unknown
): Promise<void>;
//patch-decision tracking

patchStarted(context:ExecutionSession)
patchCompleted(context:ExecutionSession)
patchFailed(
  context:ExecutionSession,
  error:unknown
)
//runtimediff
runtimeDiffStarted(context:ExecutionSession)
runtimeDiffCompleted(context:ExecutionSession)
runtimeDiffFailed(context:ExecutionSession,
  error:unknown
  
)

//runtime pipeline

runtimeStarted(context:ExecutionSession)
runtimeCompleted(context:ExecutionSession)
runtimeFailed(context:ExecutionSession,
  error:unknown
  
)
//transition pipeline
transitionStarted(context:ExecutionSession)
transitionCompleted(context:ExecutionSession)
transitionFailed(context:ExecutionSession,
  error:unknown
  
)
//executioncommmitpipelime
executionCommitStarted(context:ExecutionSession)

executionCommitCompleted(context:ExecutionSession)

executionCommitFailed(context:ExecutionSession,
  error:unknown

)


}