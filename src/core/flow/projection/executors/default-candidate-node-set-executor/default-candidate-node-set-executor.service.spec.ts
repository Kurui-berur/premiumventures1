import { Test, TestingModule } from '@nestjs/testing';
import { DefaultCandidateNodeSetExecutorService } from './default-candidate-node-set-executor.service';

describe('DefaultCandidateNodeSetExecutorService', () => {
  let service: DefaultCandidateNodeSetExecutorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultCandidateNodeSetExecutorService],
    }).compile();

    service = module.get<DefaultCandidateNodeSetExecutorService>(DefaultCandidateNodeSetExecutorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
