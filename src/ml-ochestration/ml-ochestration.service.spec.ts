import { Test, TestingModule } from '@nestjs/testing';
import { MlOchestrationService } from './ml-ochestration.service';

describe('MlOchestrationService', () => {
  let service: MlOchestrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MlOchestrationService],
    }).compile();

    service = module.get<MlOchestrationService>(MlOchestrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
