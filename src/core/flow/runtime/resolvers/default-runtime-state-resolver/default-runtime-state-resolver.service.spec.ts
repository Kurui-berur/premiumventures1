import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeStateResolverService } from './default-runtime-state-resolver.service';

describe('DefaultRuntimeStateResolverService', () => {
  let service: DefaultRuntimeStateResolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeStateResolverService],
    }).compile();

    service = module.get<DefaultRuntimeStateResolverService>(DefaultRuntimeStateResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
