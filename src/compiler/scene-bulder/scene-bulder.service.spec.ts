import { Test, TestingModule } from '@nestjs/testing';
import { SceneBulderService } from './scene-bulder.service';

describe('SceneBulderService', () => {
  let service: SceneBulderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SceneBulderService],
    }).compile();

    service = module.get<SceneBulderService>(SceneBulderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
