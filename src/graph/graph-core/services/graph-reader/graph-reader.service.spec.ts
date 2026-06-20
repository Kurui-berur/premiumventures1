import { Test, TestingModule } from '@nestjs/testing';
import { GraphReaderService } from './graph-reader.service';

describe('GraphReaderService', () => {
  let service: GraphReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphReaderService],
    }).compile();

    service = module.get<GraphReaderService>(GraphReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
