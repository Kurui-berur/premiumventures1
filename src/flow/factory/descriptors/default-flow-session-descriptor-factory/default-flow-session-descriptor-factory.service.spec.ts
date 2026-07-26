import { Test, TestingModule } from '@nestjs/testing';
import { DefaultFlowSessionDescriptorFactoryService } from './default-flow-session-descriptor-factory.service';

describe('DefaultFlowSessionDescriptorFactoryService', () => {
  let service: DefaultFlowSessionDescriptorFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultFlowSessionDescriptorFactoryService],
    }).compile();

    service = module.get<DefaultFlowSessionDescriptorFactoryService>(DefaultFlowSessionDescriptorFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
