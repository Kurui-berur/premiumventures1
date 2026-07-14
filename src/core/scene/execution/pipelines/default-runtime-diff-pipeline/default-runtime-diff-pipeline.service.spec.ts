import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeDiffPipelineService } from './default-runtime-diff-pipeline.service';

describe('DefaultRuntimeDiffPipelineService', () => {
  let service: DefaultRuntimeDiffPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeDiffPipelineService],
    }).compile();

    service = module.get<DefaultRuntimeDiffPipelineService>(DefaultRuntimeDiffPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
