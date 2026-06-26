import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeWriterService } from './default-runtime-writer.service';

describe('DefaultRuntimeWriterService', () => {
  let service: DefaultRuntimeWriterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeWriterService],
    }).compile();

    service = module.get<DefaultRuntimeWriterService>(DefaultRuntimeWriterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
