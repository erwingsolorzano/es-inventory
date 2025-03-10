import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  code: string;
  name: string;
  description?: string;
  image?: string;
  category?: string;
  qrCode?: string;
}

const ProductSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String },
  qrCode: { type: String },
}, { timestamps: true });

export default mongoose.model<IProduct>('Product', ProductSchema);
