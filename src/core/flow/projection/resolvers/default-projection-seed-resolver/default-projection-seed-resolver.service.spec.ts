import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionSeedResolverService } from './default-projection-seed-resolver.service';

describe('DefaultProjectionSeedResolverService', () => {
  let service: DefaultProjectionSeedResolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionSeedResolverService],
    }).compile();

    service = module.get<DefaultProjectionSeedResolverService>(DefaultProjectionSeedResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
