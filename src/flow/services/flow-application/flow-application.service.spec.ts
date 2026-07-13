import { Test, TestingModule } from '@nestjs/testing';
import { FlowApplicationService } from './flow-application.service';

describe('FlowApplicationService', () => {
  let service: FlowApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlowApplicationService],
    }).compile();

    service = module.get<FlowApplicationService>(FlowApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
