import { Injectable } from '@nestjs/common';
import { SceneEventBus } from '../contracts/scene-event-bus.interface';
import { SceneEvent } from '../types/scene-event.type';


type Handler =
(event: SceneEvent) => Promise<void> | void;

@Injectable()
export class InMemorySceneEventBusService implements SceneEventBus{

     private readonly handlers: Handler[] = [];

  async dispatch(
    event: SceneEvent
  ): Promise<void> {

    for (const handler of this.handlers) {
      await handler(event);
    }
  }

  subscribe(
    handler: Handler
  ): void {

    this.handlers.push(handler);
  }
}
