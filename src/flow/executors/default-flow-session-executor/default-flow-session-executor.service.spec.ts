import { Test, TestingModule } from '@nestjs/testing';
import { DefaultFlowSessionExecutorService } from './default-flow-session-executor.service';

describe('DefaultFlowSessionExecutorService', () => {
  let service: DefaultFlowSessionExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultFlowSessionExecutorService],
    }).compile();

    service = module.get<DefaultFlowSessionExecutorService>(DefaultFlowSessionExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
