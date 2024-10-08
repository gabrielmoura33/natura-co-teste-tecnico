import { Injectable, NotFoundException } from '@nestjs/common';
import { CartRepository } from '../../../modules/carts/repositories/cart.repository';
import { SaleRepository } from '../repositories/sale.repository';

@Injectable()
export class FinalizeSaleUseCase {
  constructor(
    private readonly saleRepository: SaleRepository,
    private readonly cartRepository: CartRepository,
  ) {}

  async execute(userId: string): Promise<any> {
    const cart = await this.cartRepository.findOne({ userId: userId });

    if (!cart || cart.cartItems.length === 0) {
      throw new NotFoundException('Carrinho vazio ou não encontrado');
    }

    const totalAmount = cart.cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const sale = await this.saleRepository.create({
      items: cart.cartItems.map((item) => ({
        productId: item.product._id as any,
        quantity: item.quantity,
      })),
      totalAmount,
      userId,
    });

    cart.cartItems = [];
    await cart.save();

    return sale;
  }
}
