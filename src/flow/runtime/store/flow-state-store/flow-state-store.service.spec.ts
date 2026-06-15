import { Test, TestingModule } from '@nestjs/testing';
import { FlowStateStoreService } from './flow-state-store.service';

describe('FlowStateStoreService', () => {
  let service: FlowStateStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowStateStoreService],
    }).compile();

    service = module.get<FlowStateStoreService>(FlowStateStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
