import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionContextFactoryService } from './default-execution-context-factory.service';

describe('DefaultExecutionContextFactoryService', () => {
  let service: DefaultExecutionContextFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionContextFactoryService],
    }).compile();

    service = module.get<DefaultExecutionContextFactoryService>(DefaultExecutionContextFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
