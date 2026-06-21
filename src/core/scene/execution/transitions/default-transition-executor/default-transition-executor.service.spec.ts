import { Test, TestingModule } from '@nestjs/testing';
import { DefaultTransitionExecutorService } from './default-transition-executor.service';

describe('DefaultTransitionExecutorService', () => {
  let service: DefaultTransitionExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultTransitionExecutorService],
    }).compile();

    service = module.get<DefaultTransitionExecutorService>(DefaultTransitionExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
