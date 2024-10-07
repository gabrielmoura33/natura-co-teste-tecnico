import {
  CartDocument,
  Cart,
} from 'src/shared/modules/database/schemas/cart.schema';
import { FilterQuery, UpdateQuery } from 'mongoose';

export abstract class CartRepository {
  abstract findOne(
    filter: FilterQuery<CartDocument>,
  ): Promise<CartDocument | null>;
  abstract create(cart: Partial<Cart>): Promise<CartDocument>;
  abstract update(
    filter: FilterQuery<CartDocument>,
    update: UpdateQuery<Cart>,
  ): Promise<CartDocument | null>;
  abstract delete(filter: FilterQuery<CartDocument>): Promise<void>;
}
