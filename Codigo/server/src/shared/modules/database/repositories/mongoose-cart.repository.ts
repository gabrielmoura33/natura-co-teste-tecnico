import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartRepository } from 'src/modules/carts/repositories/cart.repository';
import { Cart, CartDocument } from '../schemas/cart.schema';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { Product } from '../schemas/product.schema';

@Injectable()
export class MongooseCartRepository implements CartRepository {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<CartDocument>,
  ) {}

  async findOne(
    filter: FilterQuery<CartDocument>,
  ): Promise<CartDocument | null> {
    return this.cartModel
      .findOne(filter)
      .populate({
        path: 'cartItems.product',
        model: Product.name,
      })
      .exec();
  }

  async create(cart: Partial<Cart>): Promise<CartDocument> {
    const newCart = new this.cartModel(cart);
    return newCart.save();
  }

  async update(
    filter: FilterQuery<CartDocument>,
    update: UpdateQuery<Cart>,
  ): Promise<CartDocument | null> {
    return this.cartModel
      .findOneAndUpdate(filter, update, { new: true })
      .populate('cartItems.product')
      .exec();
  }

  async delete(filter: FilterQuery<CartDocument>): Promise<void> {
    await this.cartModel.deleteOne(filter).exec();
  }
}
