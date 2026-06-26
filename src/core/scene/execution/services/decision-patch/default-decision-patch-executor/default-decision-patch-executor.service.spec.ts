import { Test, TestingModule } from '@nestjs/testing';
import { DefaultDecisionPatchExecutorService } from './default-decision-patch-executor.service';

describe('DefaultDecisionPatchExecutorService', () => {
  let service: DefaultDecisionPatchExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultDecisionPatchExecutorService],
    }).compile();

    service = module.get<DefaultDecisionPatchExecutorService>(DefaultDecisionPatchExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
