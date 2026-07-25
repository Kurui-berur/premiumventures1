import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionMetadataFactoryService } from './default-execution-metadata-factory.service';

describe('DefaultExecutionMetadataFactoryService', () => {
  let service: DefaultExecutionMetadataFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionMetadataFactoryService],
    }).compile();

    service = module.get<DefaultExecutionMetadataFactoryService>(DefaultExecutionMetadataFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
