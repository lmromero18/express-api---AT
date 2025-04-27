import express from "express";
import routeHandler from "../middleware/route.middleware";
import { productController } from "../controllers/product.controller";
import { jwtMiddleware } from "../middleware/jwt.middleware";

const router = express.Router();

router.route("/")
  .get(routeHandler(productController.get))
  .post(jwtMiddleware, routeHandler(productController.create));

router.route("/:id")
  .get(routeHandler(productController.getById))
  .put(jwtMiddleware, routeHandler(productController.update))
  .delete(jwtMiddleware, routeHandler(productController.delete));

export default router;
