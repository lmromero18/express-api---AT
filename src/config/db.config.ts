import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/** 
    @description: Connect to MongoDB database
    @param {string} MONGO_URI - MongoDB connection string
    @param {string} MONGO_DB_NAME - MongoDB database name
*/

export const connectDB = async (mongoUri?: string, dbName?: string) => {
    try {

        mongoUri = mongoUri || process.env.MONGO_URI;
        dbName = dbName || process.env.MONGO_DB_NAME;

        const conn = await mongoose.connect(mongoUri!, { dbName });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error?.message}`);
        process.exit(1);
    }
};