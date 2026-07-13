import { Test, TestingModule } from '@nestjs/testing';
import { FlowLoaderService } from './flow-loader.service';

describe('FlowLoaderService', () => {
  let service: FlowLoaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowLoaderService],
    }).compile();

    service = module.get<FlowLoaderService>(FlowLoaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
