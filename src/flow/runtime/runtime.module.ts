import { Module } from '@nestjs/common';
import { SceneBootstrapperService } from './bootstraper/scene-bootstrapper/scene-bootstrapper.service';

import { FlowStateStoreService } from './store/flow-state-store/flow-state-store.service';
import { InMemorySceneEventBusService } from './events/in-memory-scene-event-bus/in-memory-scene-event-bus.service';

@Module({
  providers: [SceneBootstrapperService, FlowStateStoreService, InMemorySceneEventBusService],
  imports: [],
})
export class RuntimeModule {}
