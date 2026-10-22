import { Test, TestingModule } from '@nestjs/testing';
import { DefaultDecisionNodeSelectionPipelineService } from './default-decision-node-selection-pipeline.service';

describe('DefaultDecisionNodeSelectionPipelineService', () => {
  let service: DefaultDecisionNodeSelectionPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultDecisionNodeSelectionPipelineService],
    }).compile();

    service = module.get<DefaultDecisionNodeSelectionPipelineService>(DefaultDecisionNodeSelectionPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
