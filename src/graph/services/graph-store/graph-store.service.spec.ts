import { Test, TestingModule } from '@nestjs/testing';
import { GraphStoreService } from './graph-store.service';

describe('GraphStoreService', () => {
  let service: GraphStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphStoreService],
    }).compile();

    service = module.get<GraphStoreService>(GraphStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
