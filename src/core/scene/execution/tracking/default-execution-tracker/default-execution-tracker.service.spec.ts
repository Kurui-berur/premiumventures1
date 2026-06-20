import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionTrackerService } from './default-execution-tracker.service';

describe('DefaultExecutionTrackerService', () => {
  let service: DefaultExecutionTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionTrackerService],
    }).compile();

    service = module.get<DefaultExecutionTrackerService>(DefaultExecutionTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
