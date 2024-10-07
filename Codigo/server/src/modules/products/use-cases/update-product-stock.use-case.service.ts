import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Product } from 'src/shared/modules/database/schemas/product.schema';
import { ProductsRepository } from '../repositories/products.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class UpdateProductStockUseCase {
  constructor(
    private readonly productsRepository: ProductsRepository,
    @InjectQueue('stock-update-queue') private readonly stockUpdateQueue: Queue,
  ) {}

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

    await this.stockUpdateQueue.add('update-stock', {
      productId,
      stock,
    });

    return { ...existingProduct, stock: stock };
  }
}
