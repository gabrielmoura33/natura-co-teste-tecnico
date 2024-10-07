import { Injectable } from '@nestjs/common';
import { CartRepository } from '../repositories/cart.repository';

@Injectable()
export class GetCartUseCase {
  constructor(private readonly cartRepository: CartRepository) {}

  async execute(userId: string) {
    let cart = await this.cartRepository.findOne({ userId: userId });

    if (!cart) {
      cart = await this.cartRepository.create({
        userId,
      });
    }

    return cart;
  }
}
