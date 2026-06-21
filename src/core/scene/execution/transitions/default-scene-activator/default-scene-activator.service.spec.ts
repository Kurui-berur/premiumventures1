import { Test, TestingModule } from '@nestjs/testing';
import { DefaultSceneActivatorService } from './default-scene-activator.service';

describe('DefaultSceneActivatorService', () => {
  let service: DefaultSceneActivatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultSceneActivatorService],
    }).compile();

    service = module.get<DefaultSceneActivatorService>(DefaultSceneActivatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
