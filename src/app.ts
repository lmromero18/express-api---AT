import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.config';
import productRoutes from './routes/product.route';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import orderRoutes from './routes/order.route';
import { jwtHelper } from './helpers/jwt.helper';

dotenv.config();

const app = express();
const prefix = '/api/v1';
const port = process.env.APP_PORT || 3000;
const mongoUri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

/**
 * @description Check necessary environment variables.
 */
async function checkEnvironment(): Promise<void> {
    if (!mongoUri) {
        console.error('Error: MONGO_URI is not defined in the .env file.');
        process.exit(1);
    }
    if (!dbName) {
        console.error('Error: MONGO_DB_NAME is not defined in the .env file.');
        process.exit(1);
    }
}

/**
 * @description Initialize RSA keys for JWT.
 */
async function initializeKeys(): Promise<void> {
    try {
        await jwtHelper.generateKeyPair();
        console.log('RSA keys generated successfully.');
    } catch (error) {
        console.error('Failed to generate RSA keys:', error);
        process.exit(1);
    }
}

/**
 * @description Setup Express middlewares and routes.
 */
function setupExpress(): void {
    app.use(express.json());

    app.use(`${prefix}/products`, productRoutes);
    app.use(`${prefix}/auth`, authRoutes);
    app.use(`${prefix}/users`, userRoutes);
    app.use(`${prefix}/orders`, orderRoutes);
}

/**
 * @description Start the server after checking environment and keys.
 */
async function startServer(): Promise<void> {
    await checkEnvironment();
    await initializeKeys();
    connectDB();

    setupExpress();

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

startServer().catch((err) => {
    console.error('Initialization error:', err);
    process.exit(1);
});
