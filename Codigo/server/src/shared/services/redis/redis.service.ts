import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

import { IRedisService } from './interfaces/IRedisService.interface';

@Injectable()
export class RedisService implements IRedisService {
  constructor(@Inject('DBAAS_REDIS_CLIENT') private readonly client: Redis) {}

  async set(key: string, value: any, ttl?: number): Promise<void> {
    const val = JSON.stringify(value);
    if (ttl) {
      await this.client.set(key, val, 'EX', ttl);
    } else {
      await this.client.set(key, val);
    }
  }

  async get<T>(key: string): Promise<T> {
    const val = await this.client.get(key);
    if (val) {
      return JSON.parse(val);
    }
    return null;
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async getPaginatedList<T = any>(
    key: string,
    page: number,
    pageSize: number,
  ): Promise<T[]> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    const items = await this.client.lrange(key, start, end);
    return items.map((item) => JSON.parse(item));
  }

  async setPaginatedList(key: string, values: any[]): Promise<void> {
    const pipeline = this.client.pipeline();
    values.forEach((value) => {
      pipeline.rpush(key, JSON.stringify(value));
    });
    await pipeline.exec();
  }

  async delByPartialKey(partialKey: string): Promise<void> {
    const stream = this.client.scanStream({ match: `*${partialKey}*` });
    stream.on('data', async (keys: string[]) => {
      if (keys.length) {
        const pipeline = this.client.pipeline();
        keys.forEach((key) => pipeline.del(key));
        await pipeline.exec();
      }
    });
    return new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });
  }

  async revalidateCache(baseKey: string) {
    try {
      const keys = await this.client.keys(`${baseKey}*`);

      // if (keys.length) {
      //   const pipeline = this.client.pipeline();
      //   keys.forEach((key) => pipeline.expire(key, 3600));
      //   await pipeline.exec();
      // }
      if (keys.length) {
        await this.client.del(keys);
      }
    } catch (error) {
      console.error('Error revalidating cache:', error);
    }
  }
}
