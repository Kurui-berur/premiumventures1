import { Test, TestingModule } from '@nestjs/testing';
import { DefaultSceneLifecycleService } from './default-scene-lifecycle.service';

describe('DefaultSceneLifecycleService', () => {
  let service: DefaultSceneLifecycleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultSceneLifecycleService],
    }).compile();

    service = module.get<DefaultSceneLifecycleService>(DefaultSceneLifecycleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
