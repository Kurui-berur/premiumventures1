import { Test, TestingModule } from '@nestjs/testing';
import { DefaultDecisionNodeGuardService } from './default-decision-node-guard.service';

describe('DefaultDecisionNodeGuardService', () => {
  let service: DefaultDecisionNodeGuardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultDecisionNodeGuardService],
    }).compile();

    service = module.get<DefaultDecisionNodeGuardService>(DefaultDecisionNodeGuardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
