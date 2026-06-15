import { Test, TestingModule } from '@nestjs/testing';
import { GraphValidatorService } from './graph-validator.service';

describe('GraphValidatorService', () => {
  let service: GraphValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GraphValidatorService],
    }).compile();

    service = module.get<GraphValidatorService>(GraphValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
