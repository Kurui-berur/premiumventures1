import { Test, TestingModule } from '@nestjs/testing';
import { DefaultDecisionSelectorService } from './default-decision-selector.service';

describe('DefaultDecisionSelectorService', () => {
  let service: DefaultDecisionSelectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultDecisionSelectorService],
    }).compile();

    service = module.get<DefaultDecisionSelectorService>(DefaultDecisionSelectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
