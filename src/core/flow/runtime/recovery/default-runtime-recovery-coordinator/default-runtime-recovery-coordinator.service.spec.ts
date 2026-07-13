import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeRecoveryCoordinatorService } from './default-runtime-recovery-coordinator.service';

describe('DefaultRuntimeRecoveryCoordinatorService', () => {
  let service: DefaultRuntimeRecoveryCoordinatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeRecoveryCoordinatorService],
    }).compile();

    service = module.get<DefaultRuntimeRecoveryCoordinatorService>(DefaultRuntimeRecoveryCoordinatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
