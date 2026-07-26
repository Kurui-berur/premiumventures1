import { Test, TestingModule } from '@nestjs/testing';
import { DefaultFlowSessionFactoryService } from './default-flow-session-factory.service';

describe('DefaultFlowSessionFactoryService', () => {
  let service: DefaultFlowSessionFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultFlowSessionFactoryService],
    }).compile();

    service = module.get<DefaultFlowSessionFactoryService>(DefaultFlowSessionFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
