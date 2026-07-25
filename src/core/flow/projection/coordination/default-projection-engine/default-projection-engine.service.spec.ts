import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionEngineService } from './default-projection-engine.service';

describe('DefaultProjectionEngineService', () => {
  let service: DefaultProjectionEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionEngineService],
    }).compile();

    service = module.get<DefaultProjectionEngineService>(DefaultProjectionEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
