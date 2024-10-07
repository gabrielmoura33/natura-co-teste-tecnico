import { ProductsController } from './products.controller';
import { CreateProductUseCase } from './use-cases/create-product.use-case.service';

import { GetProductsUseCase } from './use-cases/get-products.use-case.service';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/shared/modules/database/database.module';
import { UpdateProductUseCase } from './use-cases/update-product.use-case.service';
import { UpdateProductStockUseCase } from './use-cases/update-product-stock.use-case.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [
    GetProductsUseCase,
    CreateProductUseCase,
    UpdateProductStockUseCase,
    UpdateProductUseCase,
  ],
})
export class ProductsModule {}
