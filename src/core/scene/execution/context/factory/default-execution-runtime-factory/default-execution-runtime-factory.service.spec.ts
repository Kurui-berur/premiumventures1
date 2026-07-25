import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionRuntimeFactoryService } from './default-execution-runtime-factory.service';

describe('DefaultExecutionRuntimeFactoryService', () => {
  let service: DefaultExecutionRuntimeFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionRuntimeFactoryService],
    }).compile();

    service = module.get<DefaultExecutionRuntimeFactoryService>(DefaultExecutionRuntimeFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
