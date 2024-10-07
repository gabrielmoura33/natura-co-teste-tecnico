// src/cart/use-cases/update-cart-product-quantity.use-case.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductsRepository } from 'src/modules/products/repositories/products.repository';
import { Cart } from 'src/shared/modules/database/schemas/cart.schema';
import { CartRepository } from '../repositories/cart.repository';

@Injectable()
export class UpdateCartProductQuantityUseCase {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    if (quantity === undefined || quantity < 1) {
      throw new BadRequestException('Quantity must be a positive number');
    }

    const product = await this.productsRepository.findOne({ _id: productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cart = await this.cartRepository.findOne({ userId: userId });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItem = cart.cartItems.find(
      (item) => item.product._id.toString() === product._id.toString(),
    );

    if (!cartItem) {
      throw new NotFoundException('Product not found in the cart');
    }

    const finalQuantity = Math.min(quantity, product.stock);
    cartItem.quantity = finalQuantity;

    const updatedCart = await cart.save();
    return updatedCart;
  }
}
