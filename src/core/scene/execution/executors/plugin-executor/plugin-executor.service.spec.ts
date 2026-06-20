import { Test, TestingModule } from '@nestjs/testing';
import { DefaultPluginExecutor} from './plugin-executor.service';

describe('PluginExecutorService', () => {
  let service: DefaultPluginExecutor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultPluginExecutor],
    }).compile();

    service = module.get<DefaultPluginExecutor>(DefaultPluginExecutor);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
