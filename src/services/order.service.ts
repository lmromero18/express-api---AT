import { Pagination, RepositoryService } from "../services/repository.service";
import Order, { IOrder } from "../models/order.model";
import Product, { IProduct } from "../models/product.model";
import { Request } from "express";

export class OrderService extends RepositoryService<IOrder> {
    constructor() {
        super(Order);
    }

    /**
     * @description Create a new order with validation and total calculation.
     * @param {Partial<IOrder>} data - Order data containing user and products.
     * @returns {Promise<IOrder>} - The created order object.
     * @throws {Error} - If validation fails or a product is invalid.
     */
    public override async create(data: Partial<IOrder>): Promise<IOrder> {
        const { products } = data;

        this.validateProductsInput(products);

        const dbProducts = await this.fetchProducts(products!);
        const { totalPrice, totalQuantity } = this.validateAndCalculate(products!, dbProducts);

        const orderData = {
            user: data.user,
            products: data.products,
            totalPrice,
            totalQuantity
        };

        const newOrder = await super.create(orderData);

        // Update product quantities in the database
        for (const item of products!) {
            const dbProduct = dbProducts.find(p => p._id.toString() == item.productId.toString());

            if (dbProduct) {
                dbProduct.quantity -= item.quantity;
                await dbProduct.save();
            }
        }

        return newOrder;
    }


    /**
     * @description Update an existing order with validation.
     * @param {string} id - ID of the order to update.
     * @param {Partial<IOrder>} data - New data for the order.
     * @returns {Promise<IOrder>} - The updated order object.
     * @throws {Error} - If validation fails, status is manually modified, or order is not found.
     */
    public override async update(id: string, data: Partial<IOrder>): Promise<IOrder> {
        const { products } = data;

        this.validateProductsInput(products);

        if (data.status) {
            throw new Error("Status cannot be updated directly.");
        }

        const currentOrder = await Order.findById(id);
        if (!currentOrder) {
            throw new Error("Order not found");
        }

        const currentProductsMap = new Map(
            currentOrder.products.map((item) => [item.productId.toString(), item.quantity])
        );

        for (const item of products!) {
            const existingQuantity = currentProductsMap.get(item.productId.toString());

            if (existingQuantity !== undefined && existingQuantity !== item.quantity) {
                throw new Error("Cannot update product quantity. Only new products can be added.");
            }
        }

        const dbProducts = await this.fetchProducts(products!);
        const { totalPrice, totalQuantity } = this.validateAndCalculate(products!, dbProducts);

        const orderData = {
            products,
            totalPrice,
            totalQuantity
        };

        const updatedOrder = await super.update(id, orderData);

        if (!updatedOrder) {
            throw new Error("Order not found");
        }

        return updatedOrder;
    }


    /**
     * @description Update the status of an existing order.
     * @param {string} id - ID of the order.
     * @param {string} status - New status to assign.
     * @returns {Promise<IOrder>} - The updated order object.
     * @throws {Error} - If status is invalid or order is not found.
     */
    public async updateStatus(id: string, status: string): Promise<IOrder> {
        const allowedStatuses = ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

        // Validar que sea un estado permitido
        if (!allowedStatuses.includes(status)) {
            throw new Error(`Invalid status.`);
        }

        // Buscar la orden actual
        const order = await Order.findById(id).populate('products.productId');

        if (!order) {
            throw new Error("Order not found");
        }

        // Validar que no se pueda cancelar una orden entregada
        if (order.status == "DELIVERED" && status == "CANCELLED") {
            throw new Error("Cannot cancel an order that has already been delivered");
        }

        // Si se está cancelando, devolver productos al stock
        if (status == "CANCELLED") {
            for (const item of order.products) {
                const product = await Product.findById(item.productId);
                if (product) {
                    product.quantity += item.quantity;
                    await product.save();
                }
            }
        }

        (order as any).status = status;
        await order.save();

        return order;
    }


    /**
     * @description Retrieve paginated orders for a specific user.
     * @param {string} userId - The ID of the user.
     * @param {Request} req - Request object containing pagination parameters.
     * @returns {Promise<Pagination<IOrder>>} - Paginated result of the user's orders.
     */
    public async getByUserId(userId: string, req: Request): Promise<Pagination<IOrder>> {
        const baseQuery = Order.find({ user: userId });
        return this.getPaginated(req, baseQuery);
    }

    /**
     * @description Validate the products input format and ensure quantities are valid.
     * @param {any[] | undefined} products - Products array from the request.
     * @throws {Error} - If products are missing or invalid.
     */
    private validateProductsInput(products: any[] | undefined): void {
        if (!products || !Array.isArray(products) || products.length == 0) {
            throw new Error("Products are required and must not be empty");
        }

        const invalidQuantity = products.some(
            (item) => !item.productId || !item.quantity || item.quantity < 1
        );

        if (invalidQuantity) {
            throw new Error(
                "Each product must have a valid productId and quantity greater or equal to 1"
            );
        }
    }

    /**
     * @description Fetch products from database using provided productIds.
     * @param {any[]} products - Products array containing productId references.
     * @returns {Promise<IProduct[]>} - Array of valid products found in the database.
     * @throws {Error} - If one or more products do not exist.
     */
    private async fetchProducts(products: any[]): Promise<IProduct[]> {
        const productIds = products.map((item) => item.productId);
        const dbProducts = await Product.find({ _id: { $in: productIds } });

        if (!dbProducts || dbProducts.length !== products.length) {
            throw new Error("One or more products do not exist");
        }

        return dbProducts;
    }

    /**
     * @description Validate stock availability and calculate total price and quantity.
     * @param {any[]} products - Ordered products.
     * @param {IProduct[]} dbProducts - Products fetched from database.
     * @returns {{ totalPrice: number, totalQuantity: number }}
     * @throws {Error} - If requested quantity exceeds available stock.
     */
    private validateAndCalculate(
        products: any[],
        dbProducts: IProduct[]
    ): { totalPrice: number; totalQuantity: number } {
        const productMap = new Map(
            dbProducts.map((product) => [String(product._id), product])
        );

        let totalPrice = 0;
        let totalQuantity = 0;

        for (const item of products) {
            const dbProduct = productMap.get(String(item.productId));

            if (!dbProduct) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }

            if (item.quantity > dbProduct.quantity) {
                throw new Error(
                    `Requested quantity (${item.quantity}) exceeds available stock (${dbProduct.quantity}) for product ${dbProduct.name}`
                );
            }

            totalPrice += dbProduct.price * item.quantity;
            totalQuantity += item.quantity;
        }

        return { totalPrice, totalQuantity };
    }
}

export const orderService = new OrderService();
