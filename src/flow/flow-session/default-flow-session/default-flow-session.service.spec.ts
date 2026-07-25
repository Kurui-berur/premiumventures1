import { Test, TestingModule } from '@nestjs/testing';
import { DefaultFlowSession } from './default-flow-session.service';

describe('DefaultFlowSession', () => {
  let service: DefaultFlowSession;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultFlowSession],
    }).compile();

    service = module.get<DefaultFlowSession>(DefaultFlowSession);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
