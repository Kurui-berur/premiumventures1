import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionLoggingMiddlewareService } from './execution-logging-middleware.service';

describe('ExecutionLoggingMiddlewareService', () => {
  let service: ExecutionLoggingMiddlewareService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExecutionLoggingMiddlewareService],
    }).compile();

    service = module.get<ExecutionLoggingMiddlewareService>(ExecutionLoggingMiddlewareService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
