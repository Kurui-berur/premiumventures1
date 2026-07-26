import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionReaderService } from './default-projection-reader.service';

describe('DefaultProjectionReaderService', () => {
  let service: DefaultProjectionReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionReaderService],
    }).compile();

    service = module.get<DefaultProjectionReaderService>(DefaultProjectionReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
