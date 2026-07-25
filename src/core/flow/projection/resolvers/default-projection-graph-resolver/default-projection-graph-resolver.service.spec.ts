import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionGraphResolverService } from './default-projection-graph-resolver.service';

describe('DefaultProjectionGraphResolverService', () => {
  let service: DefaultProjectionGraphResolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionGraphResolverService],
    }).compile();

    service = module.get<DefaultProjectionGraphResolverService>(DefaultProjectionGraphResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
