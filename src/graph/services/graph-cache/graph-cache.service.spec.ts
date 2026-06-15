import { Test, TestingModule } from '@nestjs/testing';
import { GraphCacheService } from './graph-cache.service';

describe('GraphCacheService', () => {
  let service: GraphCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphCacheService],
    }).compile();

    service = module.get<GraphCacheService>(GraphCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
