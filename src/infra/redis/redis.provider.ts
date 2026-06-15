// src/infra/redis/redis.provider.ts
import { Provider } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.token';


export const RedisProvider: Provider = {
  provide: REDIS_CLIENT,
  useFactory: () => {
    const redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),

      // 🔥 scalability settings
      maxRetriesPerRequest: null, // important for high throughput
      enableReadyCheck: true,
      lazyConnect: false,

      // 🔥 connection resiliency
      retryStrategy: (times) => {
        return Math.min(times * 50, 2000);
      },

      // 🔥 keep alive
      keepAlive: 30000,
    });

    redis.on('connect', () => {
      console.log('[Redis] connected');
    });

    redis.on('error', (err) => {
      console.error('[Redis] error', err);
    });

    return redis;
  },
};