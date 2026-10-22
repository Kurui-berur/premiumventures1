import { Module } from '@nestjs/common';
import { InMemoryEventBusService } from './event-bus/in-memory-event-bus/in-memory-event-bus.service';

@Module({
  providers: [InMemoryEventBusService]
})
export class EventSystemModule {}
