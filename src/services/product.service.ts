import Product, { IProduct } from "../models/product.model";
import { RepositoryService } from "../services/repository.service";

export class ProductService extends RepositoryService<IProduct> {
  constructor() {
    super(Product);
  }

    /**
     * @description Create a new product with validation.
     * @param data Product data.
     * @returns The newly created product.
     * @throws Error if product name already exists.
     */
    public async create(data: Partial<IProduct>): Promise<IProduct> {
        const { name, description, price, quantity } = data;

        if (!name || !description || !price || !quantity) {
            throw new Error("All fields are required");
        }

        const existingProduct = await Product.findOne({ name });
        if (existingProduct) {
            throw new Error("Product name already exists");
        }

        const productData = {
            ...data,
        };

        return await super.create(productData);

    }

    /**
     * @description Update an existing product with validation.
     * @param id Product ID.
     * @param data New product data.
     * @returns The updated product.
     * @throws Error if product name already exists.
     */
    public async update(id: string, data: Partial<IProduct>): Promise<IProduct> {
        const { name, description, price, quantity } = data;

        if (!name && !description && !price && !quantity) {
            throw new Error("At least one field must be provided to update");
        }

        if (name) {
            const existingProduct = await Product.findOne({ name, _id: { $ne: id } });
            if (existingProduct) {
                throw new Error("Product name already exists");
            }
        }

        const updatedProduct = await super.update(id, data);
        if (!updatedProduct) {
            throw new Error("Failed to update product: Product not found");
        }
        return updatedProduct;

    }
}

export const productService = new ProductService();
