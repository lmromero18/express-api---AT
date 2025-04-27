import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
    validate: {
      validator: function(v: string) {
        
        return /^[a-zA-Z0-9\s]+$/.test(v);
      },
      message: props => `${props.value} is not a valid product name (only letters, numbers and spaces allowed)`
    }
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity must be at least 0'],
    default: 0,
  }
}, { 
  timestamps: true 
});

const Product: Model<IProduct> = mongoose.model<IProduct>("Product", productSchema);

export default Product;
