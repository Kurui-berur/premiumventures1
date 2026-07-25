import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionNodePipelineService } from './default-projection-node-pipeline.service';

describe('DefaultProjectionNodePipelineService', () => {
  let service: DefaultProjectionNodePipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionNodePipelineService],
    }).compile();

    service = module.get<DefaultProjectionNodePipelineService>(DefaultProjectionNodePipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
