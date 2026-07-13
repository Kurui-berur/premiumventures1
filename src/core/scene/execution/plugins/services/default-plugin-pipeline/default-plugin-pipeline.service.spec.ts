import { Test, TestingModule } from '@nestjs/testing';
import { DefaultPluginPipelineService } from './default-plugin-pipeline.service';

describe('DefaultPluginPipelineService', () => {
  let service: DefaultPluginPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultPluginPipelineService],
    }).compile();

    service = module.get<DefaultPluginPipelineService>(DefaultPluginPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
