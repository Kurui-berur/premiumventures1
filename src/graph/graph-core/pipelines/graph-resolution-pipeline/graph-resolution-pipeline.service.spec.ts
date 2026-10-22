import { Test, TestingModule } from '@nestjs/testing';
import { GraphResolutionPipelineService } from './graph-resolution-pipeline.service';

describe('GraphResolutionPipelineService', () => {
  let service: GraphResolutionPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphResolutionPipelineService],
    }).compile();

    service = module.get<GraphResolutionPipelineService>(GraphResolutionPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
