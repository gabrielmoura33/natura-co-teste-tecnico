import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from 'src/modules/products/repositories/products.repository';
import { CartRepository } from '../repositories/cart.repository';

@Injectable()
export class AddToCartUseCase {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async execute(userId: string, productId: string, quantity: number) {
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

    if (cartItem) {
      const totalDesiredQuantity = cartItem.quantity + quantity;
      const finalQuantity = Math.min(totalDesiredQuantity, product.stock);
      cartItem.quantity = finalQuantity;
    } else {
      const finalQuantity = Math.min(quantity, product.stock);
      cart.cartItems.push({
        product: product,
        quantity: finalQuantity,
      });
    }

    await cart.save();
    return { message: 'Product added to cart' };
  }
}
