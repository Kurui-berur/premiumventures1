import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeStoreRegistryService } from './default-runtime-store-registry.service';

describe('DefaultRuntimeStoreRegistryService', () => {
  let service: DefaultRuntimeStoreRegistryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeStoreRegistryService],
    }).compile();

    service = module.get<DefaultRuntimeStoreRegistryService>(DefaultRuntimeStoreRegistryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
