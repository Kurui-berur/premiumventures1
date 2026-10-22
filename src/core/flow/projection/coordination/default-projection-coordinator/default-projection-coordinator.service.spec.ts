import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionCoordinatorService } from './default-projection-coordinator.service';

describe('DefaultProjectionCoordinatorService', () => {
  let service: DefaultProjectionCoordinatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionCoordinatorService],
    }).compile();

    service = module.get<DefaultProjectionCoordinatorService>(DefaultProjectionCoordinatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
