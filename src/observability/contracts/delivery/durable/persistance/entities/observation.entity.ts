
import type { JsonValue } from 'src/observability/contracts/observation/observation.interface';
import {
  Column,
  Entity,
  PrimaryColumn,
  Unique,
} from 'typeorm';

/**
 * Represents the database record for a persisted observation.
 */
@Entity('observations')
@Unique(
  'UQ_observations_stream_position',
  ['scopeId', 'streamId', 'sequence'],
)
export class ObservationEntity {
  /**
   * Globally identifies an observation.
   */
  @PrimaryColumn({
    name: 'observation_id',
    type: 'text',
  })
  id!: string;

  @Column({
    type: 'text',
  })
  type!: string;

  /**
   * Observation creation time, preserved as a number.
   */
  @Column({
    type: 'double precision',
  })
  timestamp!: number;

  /**
   * Stream identity, extracted from ObservationContext.
   */
  @Column({
    name: 'scope_id',
    type: 'text',
  })
  scopeId!: string;

  @Column({
    name: 'stream_id',
    type: 'text',
  })
  streamId!: string;

  @Column({
    name: 'parent_scope_id',
    type: 'text',
    nullable: true,
  })
  parentScopeId!: string | null;

  /**
   * Position within the observation stream.
   */
  @Column({
    type: 'double precision',
  })
  sequence!: number;

  /**
   * Optional causal predecessor IDs.
   */
  @Column({
    name: 'caused_by',
    type: 'jsonb',
    nullable: true,
  })
  causedBy!: readonly string[] | null;

  /**
   * Arbitrary JSON-compatible occurrence data.
   */
  @Column({
    type: 'jsonb',
  })
  payload!: JsonValue;
}
