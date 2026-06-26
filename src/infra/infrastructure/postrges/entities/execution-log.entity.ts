import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
} from 'typeorm';

import { ExecutionStage } from
'src/core/scene/execution/contracts/execution-stage.type';

@Entity('execution_logs')
@Index(
  ['executionId', 'stage'],
  { unique: true },
)
export class ExecutionLogEntity {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  executionId!: string;

  @Column()
  flowId!: string;

  @Column({
    type: 'varchar',
  })
  stage!: ExecutionStage;

  @Column('bigint')
  timestamp!: number;

  @Column('text')
  payload!: string;

}