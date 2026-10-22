import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryEventBusService } from './in-memory-event-bus.service';

describe('InMemoryEventBusService', () => {
  let service: InMemoryEventBusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryEventBusService],
    }).compile();

    service = module.get<InMemoryEventBusService>(InMemoryEventBusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
