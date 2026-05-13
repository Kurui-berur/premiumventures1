import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class SessionService {
  private redis = new Redis();

  async create(session: any) {
    await this.redis.set(
      `auth:${session.sessionId}`,
      JSON.stringify(session),
      'EX',
      300 // 5 min expiry
    );
  }

  async get(sessionId: string) {
    const data = await this.redis.get(`auth:${sessionId}`);
    return data ? JSON.parse(data) : null;
  }

  async update(sessionId: string, session: any) {
    await this.create(session);
  }

  async delete(sessionId: string) {
    await this.redis.del(`auth:${sessionId}`);
  }
}
