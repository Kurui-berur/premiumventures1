import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionCandidateNodeSet } from './default-projection-candidate-node-set.service';

describe('DefaultProjectionCandidateNodeSetService', () => {
  let service: DefaultProjectionCandidateNodeSet;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionCandidateNodeSet],
    }).compile();

    service = module.get<DefaultProjectionCandidateNodeSet >(DefaultProjectionCandidateNodeSet);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
