import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionReplayService } from './default-execution-replay.service';

describe('DefaultExecutionReplayService', () => {
  let service: DefaultExecutionReplayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionReplayService],
    }).compile();

    service = module.get<DefaultExecutionReplayService>(DefaultExecutionReplayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
