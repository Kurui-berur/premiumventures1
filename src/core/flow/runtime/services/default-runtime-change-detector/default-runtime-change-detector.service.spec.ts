import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeChangeDetectorService } from './default-runtime-change-detector.service';

describe('DefaultRuntimeChangeDetectorService', () => {
  let service: DefaultRuntimeChangeDetectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeChangeDetectorService],
    }).compile();

    service = module.get<DefaultRuntimeChangeDetectorService>(DefaultRuntimeChangeDetectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
