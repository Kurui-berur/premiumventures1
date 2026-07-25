import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionSeedPipelineService } from './default-projection-seed-pipeline.service';

describe('DefaultProjectionSeedPipelineService', () => {
  let service: DefaultProjectionSeedPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionSeedPipelineService],
    }).compile();

    service = module.get<DefaultProjectionSeedPipelineService>(DefaultProjectionSeedPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
