import { Test, TestingModule } from '@nestjs/testing';
import { DefaultDecisionApplier } from './decision-applier.service';

describe('DefaultDecisionApplier', () => {
  let service: DefaultDecisionApplier;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultDecisionApplier],
    }).compile();

    service = module.get<DefaultDecisionApplier>(DefaultDecisionApplier);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
