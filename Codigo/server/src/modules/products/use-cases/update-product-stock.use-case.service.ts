import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Product } from 'src/shared/modules/database/schemas/product.schema';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class UpdateProductStockUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(productId: string, stock: number): Promise<Product> {
    if (stock === undefined || stock < 0) {
      throw new BadRequestException('Stock must be a non-negative number');
    }

    const existingProduct = await this.productsRepository.findOne({
      _id: productId,
    });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = await this.productsRepository.update(
      { _id: productId },
      { stock },
    );

    if (!updatedProduct) {
      throw new NotFoundException('Failed to update the stock');
    }

    return updatedProduct;
  }
}
