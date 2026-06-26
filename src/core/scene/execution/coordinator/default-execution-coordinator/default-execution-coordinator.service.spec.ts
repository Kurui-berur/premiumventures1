import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionCoordinatorService } from './default-execution-coordinator.service';

describe('DefaultExecutionCoordinatorService', () => {
  let service: DefaultExecutionCoordinatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionCoordinatorService],
    }).compile();

    service = module.get<DefaultExecutionCoordinatorService>(DefaultExecutionCoordinatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
