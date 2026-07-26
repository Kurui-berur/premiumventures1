import { Test, TestingModule } from '@nestjs/testing';
import { DefaultCompositionPipelineService } from './default-composition-pipeline.service';

describe('DefaultCompositionPipelineService', () => {
  let service: DefaultCompositionPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultCompositionPipelineService],
    }).compile();

    service = module.get<DefaultCompositionPipelineService>(DefaultCompositionPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
