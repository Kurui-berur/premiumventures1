import { Test, TestingModule } from '@nestjs/testing';
import { TransitionsCompilerService } from './transitions-compiler.service';

describe('TransitionsCompilerService', () => {
  let service: TransitionsCompilerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransitionsCompilerService],
    }).compile();

    service = module.get<TransitionsCompilerService>(TransitionsCompilerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
