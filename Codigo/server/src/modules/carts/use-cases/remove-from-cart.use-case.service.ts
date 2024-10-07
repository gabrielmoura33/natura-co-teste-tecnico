import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from 'src/shared/modules/database/schemas/cart.schema';
import { CartRepository } from '../repositories/cart.repository';

@Injectable()
export class RemoveProductFromCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: string, productId: string): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ userId: userId });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const cartItemIndex = cart.cartItems.findIndex(
      (item) => item.product._id.toString() === productId,
    );

    if (cartItemIndex === -1) {
      throw new NotFoundException('Product not found in the cart');
    }

    cart.cartItems.splice(cartItemIndex, 1);

    const updatedCart = await cart.save();
    return updatedCart;
  }
}
