import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionCandidateNodeFactoryService } from './default-projection-candidate-node-factory.service';

describe('DefaultProjectionCandidateNodeFactoryService', () => {
  let service: DefaultProjectionCandidateNodeFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionCandidateNodeFactoryService],
    }).compile();

    service = module.get<DefaultProjectionCandidateNodeFactoryService>(DefaultProjectionCandidateNodeFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
