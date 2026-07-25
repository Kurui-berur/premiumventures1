import { Test, TestingModule } from '@nestjs/testing';
import { DefaultFlowViewExecutorService } from './default-flow-view-executor.service';

describe('DefaultFlowViewExecutorService', () => {
  let service: DefaultFlowViewExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultFlowViewExecutorService],
    }).compile();

    service = module.get<DefaultFlowViewExecutorService>(DefaultFlowViewExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
