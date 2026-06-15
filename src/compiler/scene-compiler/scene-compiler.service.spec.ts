import { Test, TestingModule } from '@nestjs/testing';
import { SceneCompilerService } from './scene-compiler.service';

describe('SceneCompilerService', () => {
  let service: SceneCompilerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SceneCompilerService],
    }).compile();

    service = module.get<SceneCompilerService>(SceneCompilerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
