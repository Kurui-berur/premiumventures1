import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionGraphService } from './default-projection-graph.service';

describe('DefaultProjectionGraphService', () => {
  let service: DefaultProjectionGraphService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionGraphService],
    }).compile();

    service = module.get<DefaultProjectionGraphService>(DefaultProjectionGraphService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
