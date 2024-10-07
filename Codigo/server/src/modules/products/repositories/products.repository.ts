import {
  ProductDocument,
  Product,
} from 'src/shared/modules/database/schemas/product.schema';
import { FilterQuery } from 'mongoose';

export abstract class ProductsRepository {
  abstract find(
    filter: FilterQuery<ProductDocument>,
  ): Promise<ProductDocument[]>;
  abstract findOne(
    filter: FilterQuery<ProductDocument>,
  ): Promise<ProductDocument | null>;
  abstract create(product: Partial<Product>): Promise<ProductDocument>;
  abstract update(
    filter: FilterQuery<ProductDocument>,
    update: Partial<Product>,
  ): Promise<ProductDocument | null>;
  abstract delete(filter: FilterQuery<ProductDocument>): Promise<void>;
  abstract getQuery(filter: FilterQuery<ProductDocument>): any;
}
