import { Inject, Injectable } from '@nestjs/common';
import { ExecutionQueue } from '../../contracts/execution-queue.interface';
import { SceneEvent } from 'src/core/events/types/scene-event.type';
import { SceneEventIntakeHandler } from '../../handlers/scene-event-intake.handler';
import type { ExecutionJournal } from '../../contracts/execution-journal.interface';
import { EXECUTION_JOURNAL, EXECUTION_TRACKER } from '../../tokens/execution.tokens';
import type { ExecutionTracker } from '../../contracts/execution-tracker.interface';

@Injectable()
export class DefaultExecutionQueueService implements ExecutionQueue{
    

        private queue: SceneEvent[] = [];

        private running=false;

        constructor(
            private readonly intake:SceneEventIntakeHandler,

            @Inject(EXECUTION_JOURNAL)
            
            private readonly journal:ExecutionJournal,

            @Inject(EXECUTION_TRACKER)
            private readonly tracker:ExecutionTracker

        ){


        }



       async enqueue(event: SceneEvent): Promise<void> {

        await this.tracker.queued(event)

        this.queue.push(event),

        await this.run()


        
    }

    private async run():Promise<void>{

        if (this.running){
            return
        }

        this.running=true

        try{

            while(this.queue.length){

                const next=this.queue.shift()

                if(!next){
                    continue
                }

                await this.intake.handle(next)
            }

        } finally{
            this.running=false
        }



    }



    
}
