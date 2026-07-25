import { Test, TestingModule } from '@nestjs/testing';
import { DefaultSceneView} from './default-scene-view.service';

describe('DefaultSceneView', () => {
  let service: DefaultSceneView;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultSceneView],
    }).compile();

    service = module.get<DefaultSceneView>(DefaultSceneView);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
