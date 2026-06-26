import { Test, TestingModule } from '@nestjs/testing';
import { DefaultRuntimePatchBuilderService } from './default-runtime-patch-builder.service';

describe('DefaultRuntimePatchBuilderService', () => {
  let service: DefaultRuntimePatchBuilderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultRuntimePatchBuilderService],
    }).compile();

    service = module.get<DefaultRuntimePatchBuilderService>(DefaultRuntimePatchBuilderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
