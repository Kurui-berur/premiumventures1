import { Test, TestingModule } from '@nestjs/testing';
import { DefaultCompositionService } from './default-composition.service';

describe('DefaultCompositionService', () => {
  let service: DefaultCompositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultCompositionService],
    }).compile();

    service = module.get<DefaultCompositionService>(DefaultCompositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
