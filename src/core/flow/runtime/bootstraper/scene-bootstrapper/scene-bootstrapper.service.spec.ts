import { Test, TestingModule } from '@nestjs/testing';
import { SceneBootstrapperService } from './scene-bootstrapper.service';

describe('SceneBootstrapperService', () => {
  let service: SceneBootstrapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SceneBootstrapperService],
    }).compile();

    service = module.get<SceneBootstrapperService>(SceneBootstrapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
