import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string, 
            {
                dbName: process.env.MONGO_DB_NAME,
            }
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error?.message}`);
        process.exit(1); //Process code 1 indicates an error occurred, while 0 indicates success
    }
};