import { Inject, Injectable } from "@nestjs/common";
import { EventHandler } from "../contracts/event-handlers.interface";
import { SceneEvent } from "src/core/events/types/scene-event.type";
import type { ExecutionJournal } from "../contracts/execution-journal.interface";
import { EXECUTION_FRAME_FACTORY, EXECUTION_JOURNAL, EXECUTION_TRACKER, PLUGIN_EXECUTOR } from "../tokens/execution.tokens";
import type { ExecutionFrameFactory } from "../contracts/execution-frame-factory.interface";
import type { PluginExecutor } from "../contracts/plugin-executor.interface";
import type { ExecutionTracker } from "../contracts/execution-tracker.interface";

@Injectable()
export class SceneEventIntakeHandler implements EventHandler {

    constructor(
        @Inject(EXECUTION_FRAME_FACTORY) 
        private readonly frames:ExecutionFrameFactory,
        @Inject(EXECUTION_JOURNAL)
        private readonly journal:ExecutionJournal,
        @Inject(PLUGIN_EXECUTOR)
        private readonly executor:PluginExecutor,
        @Inject(EXECUTION_TRACKER)
        private readonly tracker:ExecutionTracker

    ){}

    async handle(
event:
SceneEvent
): Promise<void>{

await this
.tracker
.event(
event
);

const frame =
this.frames
.create(
event
);

await this
.tracker
.frame(
frame
);

const decision =
await this
.executor
.execute(
frame
);

await this
.tracker
.decision(
frame,
decision
);

}
    
}