import { Test, TestingModule } from '@nestjs/testing';
import {InMemoryCheckpointStore} from './in-memory-checkpoints.service';

describe('InMemoryCheckpointsService', () => {
  let service: InMemoryCheckpointStore;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryCheckpointStore],
    }).compile();

    service = module.get<InMemoryCheckpointStore>(InMemoryCheckpointStore);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
