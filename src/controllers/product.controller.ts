import { Request, Response } from "express";
import { ProductService } from "../services/product.service"; // asumiendo que ProductService extiende RepositoryService
import { ResponseHelper } from "../helpers/response.helper";

const productService = new ProductService();

export class ProductController {
  constructor() { }

  /**
    * @description Create a new product.
    * @param req Express request object containing product data.
    * @param res Express response object.
    * @returns Response with created product or an error.
    */
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const product = await productService.create(req.body);
      return ResponseHelper.success(res, product, 201);
    } catch (error: any) {
      return ResponseHelper.error(res, error.message, 500);
    }
  }

  /**
   * @description Retrieve paginated products with optional filters.
   * @param req Express request object containing query parameters.
   * @param res Express response object.
   * @returns Response with list of products or an error.
   */
  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const result = await productService.get(req);
      return ResponseHelper.success(res, result);
    } catch (error: any) {
      return ResponseHelper.error(res, error.message);
    }
  }

  /**
   * @description Retrieve a product by its ID.
   * @param req Express request object containing product ID in params.
   * @param res Express response object.
   * @returns Response with product data or not found error.
   */
  public async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const product = await productService.getById(id);
      if (!product) {
        return ResponseHelper.error(res, "Product not found", 404);
      }
      return ResponseHelper.success(res, product);
    } catch (error: any) {
      return ResponseHelper.error(res, error.message);
    }
  }

  /**
   * @description Update a product by its ID.
   * @param req Express request object containing product ID and update data.
   * @param res Express response object.
   * @returns Response with updated product or not found error.
   */
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updatedProduct = await productService.update(id, req.body);
      if (!updatedProduct) {
        return ResponseHelper.error(res, "Product not found", 404);
      }
      return ResponseHelper.success(res, updatedProduct);
    } catch (error: any) {
      return ResponseHelper.error(res, error.message);
    }
  }

  /**
   * @description Delete a product by ID.
   * @param {Request} req - The request object containing the product ID in the URL parameters.
   * @param {Response} res - The response object to send the result.
   * @returns {Promise<Response>} - The response object with a success message or an error message.
   * @throws {Error} - Throws an error if the product deletion fails.
   */
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const deletedProduct = await productService.delete(id);
      if (!deletedProduct) {
        return ResponseHelper.error(res, "Product not found", 404);
      }
      return ResponseHelper.success(res, deletedProduct);
    } catch (error: any) {
      return ResponseHelper.error(res, error.message);
    }
  }
}

export const productController = new ProductController();
