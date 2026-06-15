import { Test, TestingModule } from '@nestjs/testing';
import { GraphVersioningService } from './graph-versioning.service';

describe('GraphVersioningService', () => {
  let service: GraphVersioningService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphVersioningService],
    }).compile();

    service = module.get<GraphVersioningService>(GraphVersioningService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
