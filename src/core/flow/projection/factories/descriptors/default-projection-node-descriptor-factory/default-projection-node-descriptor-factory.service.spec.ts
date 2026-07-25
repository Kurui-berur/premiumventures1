import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionNodeDescriptorFactoryService } from './default-projection-node-descriptor-factory.service';

describe('DefaultProjectionNodeDescriptorFactoryService', () => {
  let service: DefaultProjectionNodeDescriptorFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionNodeDescriptorFactoryService],
    }).compile();

    service = module.get<DefaultProjectionNodeDescriptorFactoryService>(DefaultProjectionNodeDescriptorFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
