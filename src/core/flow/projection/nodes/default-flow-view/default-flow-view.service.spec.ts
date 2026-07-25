import { Test, TestingModule } from '@nestjs/testing';
import { DefaultFlowView } from './default-flow-view.service';

describe('DefaultFlowView', () => {
  let service: DefaultFlowView;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultFlowView],
    }).compile();

    service = module.get<DefaultFlowView>(DefaultFlowView);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
