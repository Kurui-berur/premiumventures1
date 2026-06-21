import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionQueueService } from './default-execution-queue.service';

describe('DefaultExecutionQueueService', () => {
  let service: DefaultExecutionQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionQueueService],
    }).compile();

    service = module.get<DefaultExecutionQueueService>(DefaultExecutionQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
