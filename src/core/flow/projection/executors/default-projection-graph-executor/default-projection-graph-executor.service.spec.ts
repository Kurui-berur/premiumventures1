import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionGraphExecutorService } from './default-projection-graph-executor.service';

describe('DefaultProjectionGraphExecutorService', () => {
  let service: DefaultProjectionGraphExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionGraphExecutorService],
    }).compile();

    service = module.get<DefaultProjectionGraphExecutorService>(DefaultProjectionGraphExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
