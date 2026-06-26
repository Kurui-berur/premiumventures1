import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionTransactionService } from './default-execution-transaction.service';

describe('DefaultExecutionTransactionService', () => {
  let service: DefaultExecutionTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionTransactionService],
    }).compile();

    service = module.get<DefaultExecutionTransactionService>(DefaultExecutionTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
