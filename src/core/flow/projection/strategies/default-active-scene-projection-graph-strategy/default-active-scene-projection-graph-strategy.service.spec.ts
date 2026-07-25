import { Test, TestingModule } from '@nestjs/testing';
import { DefaultActiveSceneProjectionGraphStrategyService } from './default-active-scene-projection-graph-strategy.service';

describe('DefaultActiveSceneProjectionGraphStrategyService', () => {
  let service: DefaultActiveSceneProjectionGraphStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultActiveSceneProjectionGraphStrategyService],
    }).compile();

    service = module.get<DefaultActiveSceneProjectionGraphStrategyService>(DefaultActiveSceneProjectionGraphStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
