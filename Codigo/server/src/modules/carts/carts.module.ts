import { Module } from '@nestjs/common';

import { ProductsModule } from '../products/products.module';
import { CartController } from './carts.controller';
import { AddToCartUseCase } from './use-cases/add-to-cart.use-case.service';
import { GetCartUseCase } from './use-cases/get-cart.use-case.service';
import { DatabaseModule } from 'src/shared/modules/database/database.module';
import { UpdateCartProductQuantityUseCase } from './use-cases/update-cart.use-case.service';
import { RemoveProductFromCartUseCase } from './use-cases/remove-from-cart.use-case.service';

@Module({
  imports: [ProductsModule, DatabaseModule],
  controllers: [CartController],
  providers: [
    GetCartUseCase,
    AddToCartUseCase,
    UpdateCartProductQuantityUseCase,
    RemoveProductFromCartUseCase,
  ],
})
export class CartModule {}
