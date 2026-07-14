import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionPipelineRunnerService } from './default-execution-pipeline-runner.service';

describe('DefaultExecutionPipelineRunnerService', () => {
  let service: DefaultExecutionPipelineRunnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionPipelineRunnerService],
    }).compile();

    service = module.get<DefaultExecutionPipelineRunnerService>(DefaultExecutionPipelineRunnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
