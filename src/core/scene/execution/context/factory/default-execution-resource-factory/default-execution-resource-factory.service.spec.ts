import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionResourceFactoryService } from './default-execution-resource-factory.service';

describe('DefaultExecutionResourceFactoryService', () => {
  let service: DefaultExecutionResourceFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionResourceFactoryService],
    }).compile();

    service = module.get<DefaultExecutionResourceFactoryService>(DefaultExecutionResourceFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
