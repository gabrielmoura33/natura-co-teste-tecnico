import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RedisCacheInterceptor } from '../..//shared/interceptors/redis-cache.interceptor';
import { RedisCache } from '../../shared/decorators/redis-cache.decorator';
import { ClerkAuthGuard } from 'src/shared/guards/clerk-auth.guard';

@Controller('products')
@UseInterceptors(RedisCacheInterceptor)
export class ProductsController {
  @Get()
  @UseGuards(ClerkAuthGuard)
  @RedisCache('product_list')
  async getProducts(@Query() query: any) {
    return [1, 2, 3, 4, 5];
  }
}
