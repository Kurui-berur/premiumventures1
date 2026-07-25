import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionSeedExecutorService } from './default-projection-seed-executor.service';

describe('DefaultProjectionSeedExecutorService', () => {
  let service: DefaultProjectionSeedExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionSeedExecutorService],
    }).compile();

    service = module.get<DefaultProjectionSeedExecutorService>(DefaultProjectionSeedExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
