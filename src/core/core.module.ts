import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './cache/cache.module';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [DatabaseModule, CacheModule, ConfigModule, LoggerModule, EventsModule]
})
export class CoreModule {}
