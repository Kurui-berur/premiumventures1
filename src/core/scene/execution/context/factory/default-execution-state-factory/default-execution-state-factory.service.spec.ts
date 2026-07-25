import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionStateFactoryService } from './default-execution-state-factory.service';

describe('DefaultExecutionStateFactoryService', () => {
  let service: DefaultExecutionStateFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionStateFactoryService],
    }).compile();

    service = module.get<DefaultExecutionStateFactoryService>(DefaultExecutionStateFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
