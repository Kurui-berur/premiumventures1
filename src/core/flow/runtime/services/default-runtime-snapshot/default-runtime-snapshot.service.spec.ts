import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimeSnapshotService } from './default-runtime-snapshot.service';

describe('DefaultRuntimeSnapshotService', () => {
  let service: DefaultRuntimeSnapshotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimeSnapshotService],
    }).compile();

    service = module.get<DefaultRuntimeSnapshotService>(DefaultRuntimeSnapshotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
