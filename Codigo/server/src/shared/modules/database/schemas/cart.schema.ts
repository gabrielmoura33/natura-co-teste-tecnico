import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from './product.schema';

export type CartDocument = Cart & Document;

@Schema()
export class CartItem {
  @Prop({ type: Types.ObjectId, ref: Product.name })
  product: Product;

  @Prop()
  quantity: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema()
export class Cart {
  @Prop({ type: String, unique: true })
  userId: string;

  @Prop({ type: [CartItemSchema], default: [] })
  cartItems: CartItem[];

  @Prop({ default: 0 })
  shippingCost: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
