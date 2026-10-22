import { Test, TestingModule } from '@nestjs/testing';
import { ProjectionInitializationPipelineService } from './projection-initialization-pipeline.service';

describe('ProjectionInitializationPipelineService', () => {
  let service: ProjectionInitializationPipelineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectionInitializationPipelineService],
    }).compile();

    service = module.get<ProjectionInitializationPipelineService>(ProjectionInitializationPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
