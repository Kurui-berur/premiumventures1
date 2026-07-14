import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionCommitPipelineService } from './default-execution-commit-pipeline.service';

describe('DefaultExecutionCommitPipelineService', () => {
  let service: DefaultExecutionCommitPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionCommitPipelineService],
    }).compile();

    service = module.get<DefaultExecutionCommitPipelineService>(DefaultExecutionCommitPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
