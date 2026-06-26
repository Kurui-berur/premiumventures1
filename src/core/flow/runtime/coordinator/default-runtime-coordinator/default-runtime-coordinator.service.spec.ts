import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeCoordinatorService } from './default-runtime-coordinator.service';

describe('DefaultRuntimeCoordinatorService', () => {
  let service: DefaultRuntimeCoordinatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeCoordinatorService],
    }).compile();

    service = module.get<DefaultRuntimeCoordinatorService>(DefaultRuntimeCoordinatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
