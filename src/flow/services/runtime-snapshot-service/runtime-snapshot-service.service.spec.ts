import { Test, TestingModule } from '@nestjs/testing';
import { RuntimeSnapshotServiceService } from './runtime-snapshot-service.service';

describe('RuntimeSnapshotServiceService', () => {
  let service: RuntimeSnapshotServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuntimeSnapshotServiceService],
    }).compile();

    service = module.get<RuntimeSnapshotServiceService>(RuntimeSnapshotServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
