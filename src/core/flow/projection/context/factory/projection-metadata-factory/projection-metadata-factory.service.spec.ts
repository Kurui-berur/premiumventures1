import { Test, TestingModule } from '@nestjs/testing';
import { ProjectionMetadataFactoryService } from './projection-metadata-factory.service';

describe('ProjectionMetadataFactoryService', () => {
  let service: ProjectionMetadataFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectionMetadataFactoryService],
    }).compile();

    service = module.get<ProjectionMetadataFactoryService>(ProjectionMetadataFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
