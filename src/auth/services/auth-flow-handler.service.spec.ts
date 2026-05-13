import { Test, TestingModule } from '@nestjs/testing';
import { AuthFlowHandlerService } from './auth-flow-handler.service';

describe('AuthFlowHandlerService', () => {
  let service: AuthFlowHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthFlowHandlerService],
    }).compile();

    service = module.get<AuthFlowHandlerService>(AuthFlowHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
