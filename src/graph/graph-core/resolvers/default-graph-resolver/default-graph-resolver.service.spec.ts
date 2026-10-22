import { Test, TestingModule } from '@nestjs/testing';
import { DefaultGraphResolverService } from './default-graph-resolver.service';

describe('DefaultGraphResolverService', () => {
  let service: DefaultGraphResolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultGraphResolverService],
    }).compile();

    service = module.get<DefaultGraphResolverService>(DefaultGraphResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
