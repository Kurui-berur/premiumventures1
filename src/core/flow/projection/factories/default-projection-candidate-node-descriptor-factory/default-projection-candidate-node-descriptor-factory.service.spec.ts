import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionCandidateNodeDescriptorFactoryService } from './default-projection-candidate-node-descriptor-factory.service';

describe('DefaultProjectionCandidateNodeDescriptorFactoryService', () => {
  let service: DefaultProjectionCandidateNodeDescriptorFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionCandidateNodeDescriptorFactoryService],
    }).compile();

    service = module.get<DefaultProjectionCandidateNodeDescriptorFactoryService>(DefaultProjectionCandidateNodeDescriptorFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
