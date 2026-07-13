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
import { InfrastructureModule } from './infra/infrastructure/infrastructure.module';
import { InMemomryFlowRuntimeStorService } from './cor/flow/runtime/store/in-memomry-flow-runtime-stor/in-memomry-flow-runtime-stor.service';
import { ApplicationModule } from './application/application.module';
import { DefaultFlowApplicationServicesTsService } from './appplication/services/default-flow-application.services.ts/default-flow-application.services.ts.service';
import { FlowModule } from './flow/flow.module';
import { DefaultGuardRegistryService } from './core/guards/services/default-guard-registry/default-guard-registry.service';
import { DefaultPluginRegistryService } from './plugins/services/default-plugin-registry/default-plugin-registry.service';
import { DefaultFlowLoaderService } from './default-flow-loader/default-flow-loader.service';
import { FlowModule } from './flow/flow.module';


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
}), OtpModule, TokenModule, PaymentModule, MlOchestrationModule, RuntimeEngineModule, GraphModule, CompilerModule, RedisModule, PluginsModule, SceneModule, InfrastructureModule, ApplicationModule,],
  controllers: [AppController],
  providers: [AppService, InMemomryFlowRuntimeStorService, DefaultFlowApplicationServicesTsService, DefaultFlowLoaderService, DefaultPluginRegistryService, DefaultGuardRegistryService]
export class AppModule {}
