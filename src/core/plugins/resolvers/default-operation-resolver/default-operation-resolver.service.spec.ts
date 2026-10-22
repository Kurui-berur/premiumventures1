import { Test, TestingModule } from '@nestjs/testing';
import { DefaultOperationResolverService } from './default-operation-resolver.service';

describe('DefaultOperationResolverService', () => {
  let service: DefaultOperationResolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultOperationResolverService],
    }).compile();

    service = module.get<DefaultOperationResolverService>(DefaultOperationResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
