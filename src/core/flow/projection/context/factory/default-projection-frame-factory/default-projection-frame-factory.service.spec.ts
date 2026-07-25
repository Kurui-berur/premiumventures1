import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionFrameFactoryService } from './default-projection-frame-factory.service';

describe('DefaultProjectionFrameFactoryService', () => {
  let service: DefaultProjectionFrameFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionFrameFactoryService],
    }).compile();

    service = module.get<DefaultProjectionFrameFactoryService>(DefaultProjectionFrameFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
