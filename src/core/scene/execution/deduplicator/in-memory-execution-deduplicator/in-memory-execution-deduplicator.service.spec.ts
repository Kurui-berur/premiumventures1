import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryExecutionDeduplicatorService } from './in-memory-execution-deduplicator.service';

describe('InMemoryExecutionDeduplicatorService', () => {
  let service: InMemoryExecutionDeduplicatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InMemoryExecutionDeduplicatorService],
    }).compile();

    service = module.get<InMemoryExecutionDeduplicatorService>(InMemoryExecutionDeduplicatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
