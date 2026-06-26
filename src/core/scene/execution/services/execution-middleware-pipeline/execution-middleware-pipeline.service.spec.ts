import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionMiddlewarePipelineService } from './execution-middleware-pipeline.service';

describe('ExecutionMiddlewarePipelineService', () => {
  let service: ExecutionMiddlewarePipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutionMiddlewarePipelineService],
    }).compile();

    service = module.get<ExecutionMiddlewarePipelineService>(ExecutionMiddlewarePipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
