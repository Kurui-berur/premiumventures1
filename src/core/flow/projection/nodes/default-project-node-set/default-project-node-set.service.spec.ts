import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionNodeSet } from './default-project-node-set.service';

describe('DefaultProjectNodeSet', () => {
  let service: DefaultProjectionNodeSet
;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionNodeSet],
    }).compile();

    service = module.get<DefaultProjectionNodeSet>(DefaultProjectionNodeSet);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
