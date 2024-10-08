import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Sale extends Document {
  @Prop({
    type: [{ productId: Types.ObjectId, quantity: Number }],
    required: true,
  })
  items: { productId: Types.ObjectId; quantity: number }[];

  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({ type: String, required: true })
  userId: string;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
