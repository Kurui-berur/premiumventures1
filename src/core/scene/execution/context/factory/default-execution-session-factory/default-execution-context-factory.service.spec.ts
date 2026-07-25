import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionSessionFactoryService } from './default-execution-session-factory.service';

describe('DefaultExecutionSessionFactoryService', () => {
  let service: DefaultExecutionSessionFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionSessionFactoryService],
    }).compile();

    service = module.get<DefaultExecutionSessionFactoryService>(DefaultExecutionSessionFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
