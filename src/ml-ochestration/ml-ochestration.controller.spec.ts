import { Test, TestingModule } from '@nestjs/testing';
import { MlOchestrationController } from './ml-ochestration.controller';

describe('MlOchestrationController', () => {
  let controller: MlOchestrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MlOchestrationController],
    }).compile();

    controller = module.get<MlOchestrationController>(MlOchestrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
