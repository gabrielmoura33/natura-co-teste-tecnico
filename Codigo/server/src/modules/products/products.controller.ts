import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { RedisCacheInterceptor } from '../..//shared/interceptors/redis-cache.interceptor';
import { RedisCache } from '../../shared/decorators/redis-cache.decorator';
import { GetProductsUseCase } from './use-cases/get-products.use-case.service';
import { CreateProductUseCase } from './use-cases/create-product.use-case.service';
import { UpdateProductStockUseCase } from './use-cases/update-product-stock.use-case.service';
import { UpdateProductUseCase } from './use-cases/update-product.use-case.service';

@Controller('products')
@UseInterceptors(RedisCacheInterceptor)
export class ProductsController {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly updateProductStockUseCase: UpdateProductStockUseCase,
  ) {}

  @RedisCache('product_list')
  @Get()
  async getProducts(
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.getProductsUseCase.execute({ search, page, limit });
  }

  @Post()
  async createProduct(@Body() createProductDto: any) {
    try {
      return await this.createProductUseCase.execute(createProductDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() updateProductDto: any,
  ) {
    try {
      return await this.updateProductUseCase.execute(
        productId,
        updateProductDto,
      );
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  @Patch(':id/stock')
  async updateProductStock(
    @Param('id') productId: string,
    @Body() body: { stock: number },
  ) {
    try {
      return await this.updateProductStockUseCase.execute(
        productId,
        body.stock,
      );
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
