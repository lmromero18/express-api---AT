import mongoose, { Document, Schema, Model } from "mongoose";

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    products: {
        productId: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    totalPrice: number;
    totalQuantity: number;
    status: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
}

const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                },
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        totalQuantity: {
            type: Number,
            required: true,
            min: 1,
        },
        status: {
            type: String,
            enum: ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
            default: "PENDING",
        },
    },
    { timestamps: true }
);

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
