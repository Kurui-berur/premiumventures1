import { Test, TestingModule } from '@nestjs/testing';
import { DefaultFlowViewDescriptorFactoryService } from './default-flow-view-descriptor-factory.service';

describe('DefaultFlowViewDescriptorFactoryService', () => {
  let service: DefaultFlowViewDescriptorFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultFlowViewDescriptorFactoryService],
    }).compile();

    service = module.get<DefaultFlowViewDescriptorFactoryService>(DefaultFlowViewDescriptorFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
