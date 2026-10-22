import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryGraphRegistryService } from './in-memory-graph-registry.service';

describe('InMemoryGraphRegistryService', () => {
  let service: InMemoryGraphRegistryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryGraphRegistryService],
    }).compile();

    service = module.get<InMemoryGraphRegistryService>(InMemoryGraphRegistryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
