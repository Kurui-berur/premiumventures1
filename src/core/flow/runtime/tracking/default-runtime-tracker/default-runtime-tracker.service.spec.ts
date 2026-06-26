import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeTrackerService } from './default-runtime-tracker.service';

describe('DefaultRuntimeTrackerService', () => {
  let service: DefaultRuntimeTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeTrackerService],
    }).compile();

    service = module.get<DefaultRuntimeTrackerService>(DefaultRuntimeTrackerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
