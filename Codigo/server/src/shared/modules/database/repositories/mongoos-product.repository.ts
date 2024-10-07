import { Injectable } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductsRepository } from 'src/modules/products/repositories/products.repository';
import { Product, ProductDocument } from '../schemas/product.schema';

@Injectable()
export class MongooseProductsRepository implements ProductsRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async find(filter: FilterQuery<ProductDocument>): Promise<ProductDocument[]> {
    return this.productModel.find(filter).exec();
  }

  async findOne(
    filter: FilterQuery<ProductDocument>,
  ): Promise<ProductDocument | null> {
    return this.productModel.findOne(filter).exec();
  }

  async create(product: Partial<Product>): Promise<ProductDocument> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async update(
    filter: FilterQuery<ProductDocument>,
    update: Partial<Product>,
  ): Promise<ProductDocument | null> {
    return this.productModel
      .findOneAndUpdate(filter, update, { new: true })
      .exec();
  }

  async delete(filter: FilterQuery<ProductDocument>): Promise<void> {
    await this.productModel.deleteOne(filter).exec();
  }

  getQuery(filter: FilterQuery<ProductDocument>) {
    return this.productModel.find(filter);
  }
}
