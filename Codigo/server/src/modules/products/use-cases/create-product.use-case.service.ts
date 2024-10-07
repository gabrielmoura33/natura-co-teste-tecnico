import { Injectable, BadRequestException } from '@nestjs/common';
import { Product } from 'src/shared/modules/database/schemas/product.schema';
import { ProductsRepository } from '../repositories/products.repository';

interface CreateProductDto {
  name: string;
  originalPrice: number;
  price: number;
  stock: number;
  slug: string;
  rating: number;
  image: string;
  description: string;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productsRepository.findOne({
      slug: createProductDto.slug,
    });

    if (existingProduct) {
      throw new BadRequestException('Product with this slug already exists');
    }

    const newProduct = await this.productsRepository.create(createProductDto);
    return newProduct;
  }
}
