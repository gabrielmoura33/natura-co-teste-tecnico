import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RedisService } from '../services/redis/redis.service';
import { Reflector } from '@nestjs/core';
import { REDIS_CACHE_KEY } from '../decorators/redis-cache.decorator';

@Injectable()
export class RedisCachePaginationInterceptor implements NestInterceptor {
  constructor(
    private readonly redisService: RedisService,
    private readonly reflector: Reflector,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const key = this.reflector.get<string>(
      REDIS_CACHE_KEY,
      context.getHandler(),
    );
    if (!key) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const { page = 1, pageSize = 10 } = request.query;

    const cacheKey = `${key}_page_${page}_size_${pageSize}`;
    const cachedData = await this.redisService.getPaginatedList(
      cacheKey,
      page,
      pageSize,
    );

    if (cachedData.length > 0) {
      return of(cachedData);
    }

    return next.handle().pipe(
      tap(async (data) => {
        await this.redisService.setPaginatedList(cacheKey, data);
      }),
    );
  }
}
