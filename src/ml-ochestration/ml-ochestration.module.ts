import { Module } from '@nestjs/common';
import { MlOchestrationController } from './ml-ochestration.controller';
import { MlOchestrationService } from './ml-ochestration.service';

@Module({
  controllers: [MlOchestrationController],
  providers: [MlOchestrationService]
})
export class MlOchestrationModule {}
