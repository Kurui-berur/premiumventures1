import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionGraphPipelineService } from './default-projection-graph-pipeline.service';

describe('DefaultProjectionGraphPipelineService', () => {
  let service: DefaultProjectionGraphPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionGraphPipelineService],
    }).compile();

    service = module.get<DefaultProjectionGraphPipelineService>(DefaultProjectionGraphPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
