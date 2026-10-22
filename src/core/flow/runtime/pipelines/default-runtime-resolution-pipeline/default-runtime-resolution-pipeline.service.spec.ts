import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeResolutionPipelineService } from './default-runtime-resolution-pipeline.service';

describe('DefaultRuntimeResolutionPipelineService', () => {
  let service: DefaultRuntimeResolutionPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeResolutionPipelineService],
    }).compile();

    service = module.get<DefaultRuntimeResolutionPipelineService>(DefaultRuntimeResolutionPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
