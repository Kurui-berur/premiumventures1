import { Test, TestingModule } from '@nestjs/testing';
import { DefaultMiddlewareChainService } from './default-middleware-chain.service';

describe('DefaultMiddlewareChainService', () => {
  let service: DefaultMiddlewareChainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultMiddlewareChainService],
    }).compile();

    service = module.get<DefaultMiddlewareChainService>(DefaultMiddlewareChainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
