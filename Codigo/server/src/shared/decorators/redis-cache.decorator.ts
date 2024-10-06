import { SetMetadata } from '@nestjs/common';

export const REDIS_CACHE_KEY = 'redis_cache_key';
export const RedisCache = (cacheKey: string) =>
  SetMetadata(REDIS_CACHE_KEY, cacheKey);
