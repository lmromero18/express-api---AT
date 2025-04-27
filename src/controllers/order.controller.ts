import { Request, Response } from "express";
import { orderService } from "../services/order.service";
import { ResponseHelper } from "../helpers/response.helper";
import { jwtHelper } from "../helpers/jwt.helper";
import mongoose from "mongoose";


export class OrderController {
    constructor() { }

    private static validateProducts(products: any[]): void {
        if (!Array.isArray(products) || products.length === 0) {
            throw new Error("Products array is required and must not be empty");
        }
    }
    
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const token = await jwtHelper.getToken(req);
            if (!token) {
                return ResponseHelper.error(res, "Token not found", 401);
            }
            const userSub = await jwtHelper.getTokenSub(token);
            const userId = new mongoose.Types.ObjectId(userSub);

            const { products } = req.body;

            OrderController.validateProducts(products);

            const orderData = {
                user: userId,
                products,
            };

            const newOrder = await orderService.create(orderData);
            return ResponseHelper.success(res, newOrder, 201);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 500);
        }
    }

    public async get(req: Request, res: Response): Promise<Response> {
        try {
            const result = await orderService.get(req);
            return ResponseHelper.success(res, result);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 500);
        }
    }

    public async getById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const order = await orderService.getById(id);
            if (!order) {
                return ResponseHelper.error(res, "Order not found", 404);
            }
            return ResponseHelper.success(res, order);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 500);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const updatedOrder = await orderService.update(id, req.body);
            if (!updatedOrder) {
                return ResponseHelper.error(res, "Order not found", 404);
            }
            return ResponseHelper.success(res, updatedOrder);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 500);
        }
    }

    public async updateStatus(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedOrder = await orderService.updateStatus(id, status);
            if (!updatedOrder) {
                return ResponseHelper.error(res, "Order not found", 404);
            }
            return ResponseHelper.success(res, updatedOrder);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 500);
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const deletedOrder = await orderService.delete(id);
            return ResponseHelper.success(res, deletedOrder);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 500);
        }
    }


    public async getOrdersByUserId(req: Request, res: Response): Promise<Response> {
        try {
            const orders = await orderService.getByUserId(req.params.userId, req);
            return ResponseHelper.success(res, orders, 200);
        } catch (error: any) {
            return ResponseHelper.error(res, error.message, 500);
        }
    }
}

export const orderController = new OrderController();
