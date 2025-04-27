import { Request, Response } from "express";
import Product, { IProduct } from "../models/product.model";
import { CrudController } from "./crud.controller";

export class ProductController extends CrudController<IProduct> {
  constructor() {
    super(Product);
  }

//   public override async create(req: Request, res: Response): Promise<Response> {
//     const { name, price, image } = req.body;
//     if (!name || !price || !image) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }
//     return super.create(req, res);
//   }

}

export const productController = new ProductController();
