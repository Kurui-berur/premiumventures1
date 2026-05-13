import { Module, OnModuleInit } from '@nestjs/common';
import { FlowController } from './flow.controller';
import { AuthFlow } from 'src/auth/flows/auth.flow';
import { FlowEngine } from './core/flow.engine';
import { FlowRegistry } from './core/flow.registry';
import { AuthPresenter } from 'src/auth/flows/auth.presenter';
import { FlowSessionService } from './session/flow-session.service';
import { RedisModule } from 'src/redis/redis.module';


@Module({
  // 🔥 IMPORTANT FIX
  imports: [RedisModule],
  controllers: [FlowController],

  providers: [
    FlowRegistry,
    FlowEngine,
    FlowSessionService
  ],

  exports: [
    FlowRegistry,
    FlowEngine,
    FlowSessionService  
  ]
})
export class FlowModule {

  constructor(
  ) {}

 
}
