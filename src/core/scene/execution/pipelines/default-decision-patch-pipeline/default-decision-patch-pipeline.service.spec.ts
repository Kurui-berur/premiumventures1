import { Test, TestingModule } from '@nestjs/testing';
import { DefaultDecisionPatchPipelineService } from './default-decision-patch-pipeline.service';

describe('DefaultDecisionPatchPipelineService', () => {
  let service: DefaultDecisionPatchPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultDecisionPatchPipelineService],
    }).compile();

    service = module.get<DefaultDecisionPatchPipelineService>(DefaultDecisionPatchPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
