import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { RedisService } from '../services/redis/redis.service';
import { REDIS_CACHE_KEY } from '../decorators/redis-cache.decorator';

@Injectable()
export class RedisCacheInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const cacheKey = this.reflector.get<string>(
      REDIS_CACHE_KEY,
      context.getHandler(),
    );
    if (!cacheKey) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verifica se o user está presente, caso contrário não busca no cache
    if (!user) {
      return next.handle();
    }

    const fullCacheKey = `${cacheKey}:${user?.id}:${JSON.stringify(request.query)}`;
    const cachedResponse: any = await this.redisService.get(fullCacheKey);

    if (cachedResponse) {
      return of(JSON.parse(cachedResponse));
    }

    return next.handle().pipe(
      tap(async (response) => {
        await this.redisService.set(
          fullCacheKey,
          JSON.stringify(response),
          600, // Cache por 10 minutos
        );
      }),
    );
  }
}
