import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RedisCacheInterceptor } from '../..//shared/interceptors/redis-cache.interceptor';
import { RedisCache } from '../../shared/decorators/redis-cache.decorator';
import { ClerkUser } from 'src/shared/decorators/clerk-user.decorator';

@Controller('products')
@UseInterceptors(RedisCacheInterceptor)
export class ProductsController {
  @Get()
  @RedisCache('product_list')
  async getProducts(@ClerkUser() user) {
    return {
      user,
      products: [1, 2, 3, 4, 5],
    };
  }
}
