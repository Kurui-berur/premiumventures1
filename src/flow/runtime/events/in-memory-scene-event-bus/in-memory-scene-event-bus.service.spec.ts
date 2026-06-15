import { Test, TestingModule } from '@nestjs/testing';
import { InMemorySceneEventBusService } from './in-memory-scene-event-bus.service';

describe('InMemorySceneEventBusService', () => {
  let service: InMemorySceneEventBusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemorySceneEventBusService],
    }).compile();

    service = module.get<InMemorySceneEventBusService>(InMemorySceneEventBusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
