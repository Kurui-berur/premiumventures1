import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeStateReaderService} from './default-runtime-state-reader.service';

describe('DefaultRuntimeStateReaderService', () => {
  let service: DefaultRuntimeStateReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeStateReaderService],
    }).compile();

    service = module.get<DefaultRuntimeStateReaderService>(DefaultRuntimeStateReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
