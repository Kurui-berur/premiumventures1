import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionGraphFactoryService } from './default-projection-graph-factory.service';

describe('DefaultProjectionGraphFactoryService', () => {
  let service: DefaultProjectionGraphFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionGraphFactoryService],
    }).compile();

    service = module.get<DefaultProjectionGraphFactoryService>(DefaultProjectionGraphFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
