import { Test, TestingModule } from '@nestjs/testing';
import { DefaultExecutionIdGeneratorService } from './default-execution-id-generator.service';

describe('DefaultExecutionIdGeneratorService', () => {
  let service: DefaultExecutionIdGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultExecutionIdGeneratorService],
    }).compile();

    service = module.get<DefaultExecutionIdGeneratorService>(DefaultExecutionIdGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
