import { Test, TestingModule } from '@nestjs/testing';
import { ProjectionStateFactoryService } from './projection-state-factory.service';

describe('ProjectionStateFactoryService', () => {
  let service: ProjectionStateFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectionStateFactoryService],
    }).compile();

    service = module.get<ProjectionStateFactoryService>(ProjectionStateFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
