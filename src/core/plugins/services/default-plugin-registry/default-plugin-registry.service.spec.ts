import { Test, TestingModule } from '@nestjs/testing';
import { DefaultPluginRegistryService } from './default-plugin-registry.service';

describe('DefaultPluginRegistryService', () => {
  let service: DefaultPluginRegistryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultPluginRegistryService],
    }).compile();

    service = module.get<DefaultPluginRegistryService>(DefaultPluginRegistryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
