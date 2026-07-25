import { Test, TestingModule } from '@nestjs/testing';
import { DefaultFlowViewFactoryService } from './default-flow-view-factory.service';

describe('DefaultFlowViewFactoryService', () => {
  let service: DefaultFlowViewFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultFlowViewFactoryService],
    }).compile();

    service = module.get<DefaultFlowViewFactoryService>(DefaultFlowViewFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
