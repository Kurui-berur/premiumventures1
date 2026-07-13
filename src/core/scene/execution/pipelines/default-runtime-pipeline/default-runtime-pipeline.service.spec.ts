import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimePipelineService } from './default-runtime-pipeline.service';

describe('DefaultRuntimePipelineService', () => {
  let service: DefaultRuntimePipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimePipelineService],
    }).compile();

    service = module.get<DefaultRuntimePipelineService>(DefaultRuntimePipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
