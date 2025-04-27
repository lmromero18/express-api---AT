import express from 'express';
import { connectDB } from './config/db.config'; 
import productRoutes from './routes/product.route';
import dotenv from 'dotenv';

const app = express();
const prefix = '/api/v1';
const port = process.env.APP_PORT || 3000;

dotenv.config();

app.use(express.json());

app.use(`${prefix}/products`, productRoutes);

app.listen(port, () => {
  connectDB();
});