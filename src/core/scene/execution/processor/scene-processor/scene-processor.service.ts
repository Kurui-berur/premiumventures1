import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Subscription } from 'rxjs';
import type { SceneEventBus } from 'src/core/events/contracts/scene-event-bus.interface';
import type { EventHandler } from '../../contracts/event-handlers.interface';
import { EVENT_HANDLER } from '../../tokens/execution.tokens';
import { SCENE_EVENT_BUS } from 'src/core/events/tokens/scene-event-bus.token';

@Injectable()
export class SceneProcessor implements OnModuleDestroy{
    private started=false

    constructor(
        @Inject(SCENE_EVENT_BUS)
        private readonly bus:SceneEventBus,
        @Inject(EVENT_HANDLER)
        private readonly handler:EventHandler

    ){}
//start of scene processor 
    start():void{

    if(this.started){
        return
    }

    this.started=true;
    this.bus.subscribe(async event=>{
        await this.handler.handle(event)

    })

    

    }
    stop(){
        this.started=false
    }
    onModuleDestroy() {
        this.stop()
    }

}
