import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeStoreFactoryService } from './default-runtime-store-factory.service';

describe('DefaultRuntimeStoreFactoryService', () => {
  let service: DefaultRuntimeStoreFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeStoreFactoryService],
    }).compile();

    service = module.get<DefaultRuntimeStoreFactoryService>(DefaultRuntimeStoreFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
