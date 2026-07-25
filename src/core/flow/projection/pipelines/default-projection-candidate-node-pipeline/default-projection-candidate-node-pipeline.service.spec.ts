import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionCandidateNodePipelineService } from './default-projection-candidate-node-pipeline.service';

describe('DefaultProjectionCandidateNodePipelineService', () => {
  let service: DefaultProjectionCandidateNodePipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionCandidateNodePipelineService],
    }).compile();

    service = module.get<DefaultProjectionCandidateNodePipelineService>(DefaultProjectionCandidateNodePipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
