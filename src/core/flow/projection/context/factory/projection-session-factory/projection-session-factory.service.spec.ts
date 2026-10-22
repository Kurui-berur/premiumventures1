import { Test, TestingModule } from '@nestjs/testing';
import { ProjectionSessionFactoryService } from './projection-session-factory.service';

describe('ProjectionSessionFactoryService', () => {
  let service: ProjectionSessionFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectionSessionFactoryService],
    }).compile();

    service = module.get<ProjectionSessionFactoryService>(ProjectionSessionFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
