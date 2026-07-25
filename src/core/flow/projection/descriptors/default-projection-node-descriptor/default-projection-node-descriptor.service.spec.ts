import { Test, TestingModule } from '@nestjs/testing';
import { DefaultProjectionNodeDescriptor } from './default-projection-node-descriptor.service';

describe('DefaultProjectionNodeDescriptorService', () => {
  let service: DefaultProjectionNodeDescriptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultProjectionNodeDescriptor],
    }).compile();

    service = module.get<DefaultProjectionNodeDescriptor>(DefaultProjectionNodeDescriptor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
