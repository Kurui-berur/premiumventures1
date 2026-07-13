import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeSnapshotReaderService } from './default-runtime-snapshot-reader.service';

describe('DefaultRuntimeSnapshotReaderService', () => {
  let service: DefaultRuntimeSnapshotReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeSnapshotReaderService],
    }).compile();

    service = module.get<DefaultRuntimeSnapshotReaderService>(DefaultRuntimeSnapshotReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
