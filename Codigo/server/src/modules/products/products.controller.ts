import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { RedisCacheInterceptor } from '../..//shared/interceptors/redis-cache.interceptor';
import { RedisCache } from '../../shared/decorators/redis-cache.decorator';

@Controller('products')
@UseInterceptors(RedisCacheInterceptor)
export class ProductsController {
  @Get()
  @RedisCache('product_list')
  async getProducts(@Query() query: any) {
    return [1, 2, 3];
  }
}
