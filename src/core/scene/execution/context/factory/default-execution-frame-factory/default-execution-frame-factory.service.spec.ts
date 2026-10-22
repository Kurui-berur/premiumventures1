import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionFrameFactoryService } from './default-execution-frame-factory.service';

describe('DefaultExecutionFrameFactoryService', () => {
  let service: DefaultExecutionFrameFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionFrameFactoryService],
    }).compile();

    service = module.get<DefaultExecutionFrameFactoryService>(DefaultExecutionFrameFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
