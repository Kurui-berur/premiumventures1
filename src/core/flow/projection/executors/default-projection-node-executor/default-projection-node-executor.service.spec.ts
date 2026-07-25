import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionNodeExecutorService } from './default-projection-node-executor.service';

describe('DefaultProjectionNodeExecutorService', () => {
  let service: DefaultProjectionNodeExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionNodeExecutorService],
    }).compile();

    service = module.get<DefaultProjectionNodeExecutorService>(DefaultProjectionNodeExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
