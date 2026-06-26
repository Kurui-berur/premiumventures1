import { Test, TestingModule } from '@nestjs/testing';
import { BullExecutionQueueService } from './bull-execution-queue.service';

describe('BullExecutionQueueService', () => {
  let service: BullExecutionQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BullExecutionQueueService],
    }).compile();

    service = module.get<BullExecutionQueueService>(BullExecutionQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
