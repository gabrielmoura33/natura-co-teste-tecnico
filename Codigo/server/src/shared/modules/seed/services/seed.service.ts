import { Injectable, OnModuleInit, Logger } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import { ProductsRepository } from 'src/modules/products/repositories/products.repository';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly productsRepository: ProductsRepository) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  private async seedProducts() {
    try {
      const filePath = path.join(__dirname, '../../seed/products.json');
      const fileData = fs.readFileSync(filePath, 'utf8');
      const products = JSON.parse(fileData);

      for (const product of products) {
        const existingProduct = await this.productsRepository.findOne({
          slug: product.slug,
        });
        if (!existingProduct) {
          await this.productsRepository.create(product);
          this.logger.log(`Product '${product.name}' added to the database.`);
        }
      }
    } catch (error) {
      this.logger.error('Error seeding products:', error.message);
    }
  }
}
