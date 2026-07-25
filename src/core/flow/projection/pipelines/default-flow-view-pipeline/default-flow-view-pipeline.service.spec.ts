import { Test, TestingModule } from '@nestjs/testing';
import { DefaultFlowViewPipelineService } from './default-flow-view-pipeline.service';

describe('DefaultFlowViewPipelineService', () => {
  let service: DefaultFlowViewPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultFlowViewPipelineService],
    }).compile();

    service = module.get<DefaultFlowViewPipelineService>(DefaultFlowViewPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
