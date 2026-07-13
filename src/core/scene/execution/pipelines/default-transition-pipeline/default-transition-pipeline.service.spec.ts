import { Test, TestingModule } from '@nestjs/testing';
import { DefaultTransitionPipelineService } from './default-transition-pipeline.service';

describe('DefaultTransitionPipelineService', () => {
  let service: DefaultTransitionPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultTransitionPipelineService],
    }).compile();

    service = module.get<DefaultTransitionPipelineService>(DefaultTransitionPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
