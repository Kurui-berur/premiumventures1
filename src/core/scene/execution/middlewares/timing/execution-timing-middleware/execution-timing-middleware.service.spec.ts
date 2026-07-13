import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionTimingMiddlewareService } from './execution-timing-middleware.service';

describe('ExecutionTimingMiddlewareService', () => {
  let service: ExecutionTimingMiddlewareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutionTimingMiddlewareService],
    }).compile();

    service = module.get<ExecutionTimingMiddlewareService>(ExecutionTimingMiddlewareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
