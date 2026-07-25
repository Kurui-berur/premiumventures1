import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionGraphStrategyRegistryService } from './default-projection-graph-strategy-registry.service';

describe('DefaultProjectionGraphStrategyRegistryService', () => {
  let service: DefaultProjectionGraphStrategyRegistryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionGraphStrategyRegistryService],
    }).compile();

    service = module.get<DefaultProjectionGraphStrategyRegistryService>(DefaultProjectionGraphStrategyRegistryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
