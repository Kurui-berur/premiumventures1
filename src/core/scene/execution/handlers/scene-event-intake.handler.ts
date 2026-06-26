import { Inject, Injectable } from "@nestjs/common";
import { EventHandler } from "../contracts/event-handlers.interface";
import { SceneEvent } from "src/core/events/types/scene-event.type";
import { EXECUTION_COORDINATOR, EXECUTION_QUEUE} from "../tokens/execution.tokens";
import type { ExecutionCoordinator } from "../contracts/execution-coordinator.interface";
import type { ExecutionQueue } from "../contracts/execution-queue.interface";

@Injectable()
export class SceneEventIntakeHandler implements EventHandler {

    constructor(
        
              @Inject(EXECUTION_QUEUE)
              private readonly queue:ExecutionQueue

)

    {}

    async handle(event:SceneEvent): Promise<void>{

        await this.queue.enqueue(event);
    }
}
