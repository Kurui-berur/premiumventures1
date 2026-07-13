import { Test, TestingModule } from '@nestjs/testing';
import { DefaultGuardRegistryService } from './default-guard-registry.service';

describe('DefaultGuardRegistryService', () => {
  let service: DefaultGuardRegistryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultGuardRegistryService],
    }).compile();

    service = module.get<DefaultGuardRegistryService>(DefaultGuardRegistryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
