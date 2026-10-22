import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionInitializationPipelineService } from './execution-initialization-pipeline.service';

describe('ExecutionInitializationPipelineService', () => {
  let service: ExecutionInitializationPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutionInitializationPipelineService],
    }).compile();

    service = module.get<ExecutionInitializationPipelineService>(ExecutionInitializationPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
