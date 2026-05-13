import {
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

import Redis from 'ioredis';

import { REDIS_CLIENT } from '../../redis/redis.provider';
import { FlowSession } from '../types/flow-session.type';


@Injectable()
export class FlowSessionService {
  private readonly logger = new Logger(
    FlowSessionService.name,
  );

  /**
   * ---------------------------------------------------------
   * SESSION TTL
   * ---------------------------------------------------------
   */

  private readonly ttl = 60 * 60; // 1 hour

  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: Redis,
  ) {}

  /**
   * ---------------------------------------------------------
   * SESSION KEY
   * ---------------------------------------------------------
   */

  private key(sessionId: string) {
    return `flow:session:${sessionId}`;
  }

  /**
   * ---------------------------------------------------------
   * GET SESSION
   * ---------------------------------------------------------
   */

  async get(sessionId: string,): Promise<FlowSession | null> {

    const data = await this.redis.get(
      this.key(sessionId),
    );

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  /**
   * ---------------------------------------------------------
   * CREATE / REPLACE SESSION
   * ---------------------------------------------------------
   */

  async set(sessionId: string,value: FlowSession,
  ): Promise<void> {
    await this.redis.set(
      this.key(sessionId),

      JSON.stringify(value),

      'EX',

      this.ttl,
    );
  }

  /**
   * ---------------------------------------------------------
   * PARTIAL UPDATE
   * ---------------------------------------------------------
   */

  async update(sessionId: string,patch: Partial<FlowSession>,): Promise<FlowSession | null> {
    const current = await this.get(
      sessionId,
    );

    if (!current) {
      return null;
    }

    const updated: FlowSession = {
      ...current,

      ...patch,

      updatedAt: Date.now(),
    };

    await this.set(sessionId, updated);

    return updated;
  }

  /**
   * ---------------------------------------------------------
   * OPTIMISTIC CONCURRENCY CONTROL
   * ---------------------------------------------------------
   *
   * Only updates if:
   * current.version === expectedVersion
   *
   * Prevents concurrent state corruption.
   * ---------------------------------------------------------
   */

  async updateIfVersionMatches(sessionId: string,expectedVersion: number,next: FlowSession,
  ): Promise<boolean> {
    
    const key = this.key(sessionId);

    /**
     * -----------------------------------------------------
     * WATCH KEY
     * -----------------------------------------------------
     */

    await this.redis.watch(key);

    const raw = await this.redis.get(key);

    /**
     * -----------------------------------------------------
     * SESSION MUST EXIST
     * -----------------------------------------------------
     */

    if (!raw) {
      await this.redis.unwatch();

      return false;
    }

    const current: FlowSession =
      JSON.parse(raw);

    /**
     * -----------------------------------------------------
     * VERSION CHECK
     * -----------------------------------------------------
     */

    if (
      current.version !== expectedVersion
    ) {
      this.logger.warn(
        `Version conflict detected for session ${sessionId}`,
      );

      await this.redis.unwatch();

      return false;
    }

    /**
     * -----------------------------------------------------
     * ATOMIC TRANSACTION
     * -----------------------------------------------------
     */

    const multi = this.redis.multi();

    multi.set(
      key,

      JSON.stringify(next),

      'EX',

      this.ttl,
    );

    const result = await multi.exec();

    /**
     * -----------------------------------------------------
     * NULL RESULT = WATCH FAILURE
     * -----------------------------------------------------
     */

    if (!result) {
      this.logger.warn(
        `Redis transaction conflict for session ${sessionId}`,
      );

      return false;
    }

    return true;
  }

  /**
   * ---------------------------------------------------------
   * DELETE SESSION
   * ---------------------------------------------------------
   */

  async delete(
    sessionId: string,
  ): Promise<void> {
    await this.redis.del(
      this.key(sessionId),
    );
  }

  /**
   * ---------------------------------------------------------
   * EXTEND SESSION TTL
   * ---------------------------------------------------------
   */

  async touch(
    sessionId: string,
  ): Promise<void> {
    await this.redis.expire(
      this.key(sessionId),
      this.ttl,
    );
  }

  /**
   * ---------------------------------------------------------
   * CHECK SESSION EXISTS
   * ---------------------------------------------------------
   */

  async exists(
    sessionId: string,
  ): Promise<boolean> {
    const exists = await this.redis.exists(
      this.key(sessionId),
    );

    return exists === 1;
  }
}