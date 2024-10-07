import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class GetProductsUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(query: { search?: string; page?: number; limit?: number }) {
    const { search = '', page = 1, limit = 10 } = query;

    // Função para remover acentos e normalizar o texto
    const normalizeText = (text: string) =>
      text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const normalizedSearch = normalizeText(search);

    const filter = search
      ? { name: { $regex: new RegExp(normalizedSearch, 'i') } } // Removido o campo $options
      : {};

    const totalProducts = await this.productsRepository.find(filter);

    const products = await this.productsRepository
      .getQuery(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    const totalPages = Math.ceil(totalProducts.length / limit);

    return {
      products,
      currentPage: page,
      totalPages,
      totalProducts: totalProducts.length,
    };
  }
}
