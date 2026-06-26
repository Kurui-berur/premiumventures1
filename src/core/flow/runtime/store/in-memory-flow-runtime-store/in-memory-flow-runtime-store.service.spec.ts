import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryFlowRuntimeStoreService } from './in-memory-flow-runtime-store.service';

describe('InMemoryFlowRuntimeStoreService', () => {
  let service: InMemoryFlowRuntimeStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryFlowRuntimeStoreService],
    }).compile();

    service = module.get<InMemoryFlowRuntimeStoreService>(InMemoryFlowRuntimeStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
