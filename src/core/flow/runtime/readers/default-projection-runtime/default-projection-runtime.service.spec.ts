import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionRuntimeService } from './default-projection-runtime.service';

describe('DefaultProjectionRuntimeService', () => {
  let service: DefaultProjectionRuntimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionRuntimeService],
    }).compile();

    service = module.get<DefaultProjectionRuntimeService>(DefaultProjectionRuntimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
