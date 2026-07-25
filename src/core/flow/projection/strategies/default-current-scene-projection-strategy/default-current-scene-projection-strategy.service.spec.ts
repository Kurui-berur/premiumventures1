import { Test, TestingModule } from '@nestjs/testing';
import { DefaultCurrentSceneProjectionStrategyService } from './default-current-scene-projection-strategy.service';

describe('DefaultCurrentSceneProjectionStrategyService', () => {
  let service: DefaultCurrentSceneProjectionStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultCurrentSceneProjectionStrategyService],
    }).compile();

    service = module.get<DefaultCurrentSceneProjectionStrategyService>(DefaultCurrentSceneProjectionStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
