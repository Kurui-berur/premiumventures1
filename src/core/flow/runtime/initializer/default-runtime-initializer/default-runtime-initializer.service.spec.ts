import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeInitializerService } from './default-runtime-initializer.service';

describe('DefaultRuntimeInitializerService', () => {
  let service: DefaultRuntimeInitializerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeInitializerService],
    }).compile();

    service = module.get<DefaultRuntimeInitializerService>(DefaultRuntimeInitializerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
