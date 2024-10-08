import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  originalPrice: number;

  @Prop()
  price: number;

  @Prop()
  stock: number;

  @Prop({ unique: true })
  slug: string;

  @Prop()
  rating: number;

  @Prop()
  image: string;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
