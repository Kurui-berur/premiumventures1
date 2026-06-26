import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { PostgresExecutionJournal } from 'src/core/scene/execution/logs/postgres-execution-journal/postgres-execution-journal.service';
import { EXECUTION_JOURNAL } from 'src/core/scene/execution/tokens/execution.tokens';
import { ExecutionLogEntity } from './postrges/entities/execution-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExecutionLogEntity,
    ]),

    BullModule.forRoot({
      connection: {
        host:
          process.env.REDIS_HOST,

        port:
          Number(
            process.env.REDIS_PORT,
          ),
      },
    }),

    BullModule.registerQueue({
      name:
        'execution',
    }),
  ],

  providers: [
    PostgresExecutionJournal,

    {
      provide:
        EXECUTION_JOURNAL,

      useExisting:
        PostgresExecutionJournal,
    },
  ],

  exports: [
    BullModule,
    EXECUTION_JOURNAL,
  ],
})
export class InfrastructureModule {}
