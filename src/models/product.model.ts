// src/models/product.model.ts
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  image: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true, unique: true, trim: true, maxlength: 100 },
  price: { type: Number, required: true, default: 0.0 },
  image: { type: String, required: true },
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);
export default Product;
