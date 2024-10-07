import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Product } from 'src/shared/modules/database/schemas/product.schema';
import { ProductsRepository } from '../repositories/products.repository';

interface UpdateProductDto {
  name?: string;
  originalPrice?: number;
  price?: number;
  stock?: number;
  slug?: string;
  rating?: number;
  image?: string;
  description?: string;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.productsRepository.findOne({
      _id: productId,
    });

    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    if (updateProductDto.slug) {
      const slugExists = await this.productsRepository.findOne({
        slug: updateProductDto.slug,
        _id: { $ne: productId },
      });
      if (slugExists) {
        throw new BadRequestException('Product with this slug already exists');
      }
    }

    const updatedProduct = await this.productsRepository.update(
      { _id: productId },
      updateProductDto,
    );

    if (!updatedProduct) {
      throw new NotFoundException('Failed to update the product');
    }

    return updatedProduct;
  }
}
