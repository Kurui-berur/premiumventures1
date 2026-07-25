import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionNodeFactoryService } from './default-projection-node-factory.service';

describe('DefaultProjectionNodeFactoryService', () => {
  let service: DefaultProjectionNodeFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionNodeFactoryService],
    }).compile();

    service = module.get<DefaultProjectionNodeFactoryService>(DefaultProjectionNodeFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
