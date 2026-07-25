import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionTrackerService } from './default-projection-tracker.service';

describe('DefaultProjectionTrackerService', () => {
  let service: DefaultProjectionTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionTrackerService],
    }).compile();

    service = module.get<DefaultProjectionTrackerService>(DefaultProjectionTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
