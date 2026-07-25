import { Test, TestingModule } from '@nestjs/testing';
import { DefaultFlowViewDescriptor } from './default-flow-view-descriptor.service';


describe('DefaultFlowViewDescriptor', () => {
  let service: DefaultFlowViewDescriptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultFlowViewDescriptor],
    }).compile();

    service = module.get<DefaultFlowViewDescriptor>(DefaultFlowViewDescriptor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
