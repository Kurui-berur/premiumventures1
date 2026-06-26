import { Injectable } from '@nestjs/common';
import { ExecutionQueue } from '../../contracts/execution-queue.interface';
import { SceneEvent } from 'src/core/events/types/scene-event.type';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class BullExecutionQueueService implements ExecutionQueue {


    constructor(
        @InjectQueue('flow-runtime-events')
        private readonly queue:Queue
){}

    async enqueue(event: SceneEvent): Promise<void> {
        
    }

}
