import { Test, TestingModule } from '@nestjs/testing';
import { DefaultCompositionSessionFactoryService } from './default-composition-session-factory.service';

describe('DefaultCompositionSessionFactoryService', () => {
  let service: DefaultCompositionSessionFactoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultCompositionSessionFactoryService],
    }).compile();

    service = module.get<DefaultCompositionSessionFactoryService>(DefaultCompositionSessionFactoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
