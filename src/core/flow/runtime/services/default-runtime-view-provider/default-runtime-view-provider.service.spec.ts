import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeViewProviderService } from './default-runtime-view-provider.service';

describe('DefaultRuntimeViewProviderService', () => {
  let service: DefaultRuntimeViewProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeViewProviderService],
    }).compile();

    service = module.get<DefaultRuntimeViewProviderService>(DefaultRuntimeViewProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
