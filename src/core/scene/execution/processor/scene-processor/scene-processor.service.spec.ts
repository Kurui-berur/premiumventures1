import { Test, TestingModule } from '@nestjs/testing';
import { SceneProcessor} from './scene-processor.service';

describe('SceneProcessorService', () => {
  let service: SceneProcessor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SceneProcessor],
    }).compile();

    service = module.get<SceneProcessor>(SceneProcessor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
