import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  UseGuards,
  Put,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';
import { AddToCartUseCase } from './use-cases/add-to-cart.use-case.service';
import { GetCartUseCase } from './use-cases/get-cart.use-case.service';
import { ClerkAuthGuard } from 'src/shared/guards/clerk-auth.guard';
import { ClerkUser } from 'src/shared/decorators/clerk-user.decorator';
import { UpdateCartProductQuantityUseCase } from './use-cases/update-cart.use-case.service';
import { RemoveProductFromCartUseCase } from './use-cases/remove-from-cart.use-case.service';

@Controller('cart')
@UseGuards(ClerkAuthGuard)
export class CartController {
  constructor(
    private readonly getCartUseCase: GetCartUseCase,
    private readonly addToCartUseCase: AddToCartUseCase,
    private readonly updateCartProductQuantityUseCase: UpdateCartProductQuantityUseCase,
    private readonly removeProductFromCartUseCase: RemoveProductFromCartUseCase,
  ) {}

  @Get('')
  async getCart(@ClerkUser() user: { id: string }) {
    const cart = await this.getCartUseCase.execute(user.id);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  @Post('/add')
  async addToCart(
    @ClerkUser() user: { id: string },
    @Body() body: { productId: string; quantity: number },
  ) {
    const { productId, quantity } = body;
    return this.addToCartUseCase.execute(user.id, productId, quantity);
  }

  @Put('/update')
  async updateProductQuantity(
    @ClerkUser() user: { id: string },
    @Body() body: { productId: string; quantity: number },
  ) {
    try {
      const { productId, quantity } = body;
      return await this.updateCartProductQuantityUseCase.execute(
        user.id,
        productId,
        quantity,
      );
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
  @Delete('/remove/:productId')
  async removeProductFromCart(
    @ClerkUser() user: { id: string },
    @Param('productId') productId: string,
  ) {
    try {
      return await this.removeProductFromCartUseCase.execute(
        user.id,
        productId,
      );
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
