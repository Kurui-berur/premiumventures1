import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlocksModule } from './blocks/blocks.module';
import { AuthModule } from './auth/auth.module';
import { RealtimeModule } from './realtime/realtime.module';
import { UsersModule } from './users/users.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { CoreModule } from './core/core.module';
import { ContentModule } from './content/content.module';
import { FlowModule } from './core/flow/flow.module';
import { TokenModule } from './token/token.module';
import { OtpModule } from './otp/otp.module';
import { PaymentModule } from './payment/payment.module';
import { MlOchestrationModule } from './ml-ochestration/ml-ochestration.module';
import { RuntimeEngineModule } from './runtime-engine/runtime-engine.module';
import { GraphModule } from './graph/graph.module';
import { CompilerModule } from './compiler/compiler.module';
import { FlowModule } from './core/flow/flow.module';
import { RedisModule } from './infra/redis/redis.module';
import { InMemorySceneEventBusService } from './runtime/events/in-memory-scene-event-bus/in-memory-scene-event-bus.service';
import { PluginsModule } from './core/plugins/plugins.module';
import { SceneModule } from './core/scene/scene.module';


@Module({
  imports: [DiscussionsModule,ConfigModule.forRoot({
    envFilePath:['.env']
  }), BlocksModule, CoreModule, 
  ConfigModule.forRoot({
      isGlobal: true, // 🔥 makes it injectable everywhere
    }), FlowModule,ContentModule, DiscussionsModule,
   UsersModule, RealtimeModule, AuthModule,FlowModule
  ,TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'premiumventures',
  autoLoadEntities: true,
  synchronize: true, // dev only
}), OtpModule, TokenModule, PaymentModule, MlOchestrationModule, RuntimeEngineModule, GraphModule, CompilerModule, RedisModule, PluginsModule, SceneModule,],
  controllers: [AppController],
  providers: [AppService, Src\auth\services\authFlowServiceService, Auth\services\authFlowService, Auth\services\authFlowService, Auth\services\authFlowService, InMemorySceneEventBusService, ],
})
export class AppModule {}
