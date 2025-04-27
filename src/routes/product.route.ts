import express from "express";
import asyncHandler from "../handlers/async.handler";
import { productController } from "../controllers/product.controller";

const router = express.Router();

router.route("/")
  .get(asyncHandler(productController.getPaginated))
  .post(asyncHandler(productController.create));

router.route("/:id")
  .get(asyncHandler(productController.getById))
  .put(asyncHandler(productController.update))
  .delete(asyncHandler(productController.delete));

export default router;
