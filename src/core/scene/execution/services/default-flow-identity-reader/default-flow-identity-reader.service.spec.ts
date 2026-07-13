import { Test, TestingModule } from '@nestjs/testing';
import { DefaultFlowIdentityReaderService } from './default-flow-identity-reader.service';

describe('DefaultFlowIdentityReaderService', () => {
  let service: DefaultFlowIdentityReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultFlowIdentityReaderService],
    }).compile();

    service = module.get<DefaultFlowIdentityReaderService>(DefaultFlowIdentityReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
