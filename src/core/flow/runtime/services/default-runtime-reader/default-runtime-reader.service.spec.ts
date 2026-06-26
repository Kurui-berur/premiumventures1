import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeReaderService } from './default-runtime-reader.service';

describe('DefaultRuntimeReaderService', () => {
  let service: DefaultRuntimeReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeReaderService],
    }).compile();

    service = module.get<DefaultRuntimeReaderService>(DefaultRuntimeReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
